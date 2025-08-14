import React from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import client from "part:@sanity/base/client";
import { withRouterHOC } from "part:@sanity/base/router";
import styles from "../index.css";
import { setOrder, setListOrder, getDocumentTypeNames, willUserOverrideData } from "../functions";
import { DEFAULT_FIELD_VALUE, DEFAULT_FIELD_LABEL } from "../data";
import DraggableSection from "./organisms/DraggableSection";
import TypeSection from "./organisms/TypeSection";

const PAGE_SIZE = 25;
const BASE_QUERY = `*[!(_id in path("drafts.**")) && _type == 'bio' && boardYear->year == $year]`
// note: going above 25 can lead to Promises not resolving

class OrderDocuments extends React.Component {
  state = {
    count: 0,
    documents: [],
    boardYears: [],
    year: { label: "", value: "" },
    field: { label: DEFAULT_FIELD_LABEL, value: DEFAULT_FIELD_VALUE },
    fields: [],
  };

  componentDidMount() {
    this.getBoardYears();
  }

  loadMore = async () => {
    const length = this.state.documents.length;

    const newDocuments = await client.fetch(
      `${BASE_QUERY} | order (${
        this.state.field.value
      } asc, order asc, _updatedAt desc)[${length}...${length + PAGE_SIZE}]`,
      { year: this.state.year.value }
    );

    const documents = [...this.state.documents, ...newDocuments];

    this.setState({ documents });

    await setListOrder(newDocuments, this.state.field.value, length);
  };

  getBoardYears = async () => {
    const boardYears = await client.fetch(
      `*[_type == 'boardYear'] | order (year desc).year`
    );
    this.setState({ boardYears });
  };

  getFields = () => {
    const { year, boardYears } = this.state;

    // const selectedType = boardYears.find(({ name }) => name === type.value);

    // const fields = (selectedType ? selectedType.fields : []).map(({ name, title }) => ({
    //   value: name,
    //   label: title,
    // }));

    // Unused for our use case
    const fields = []

    this.setState({ fields });
  };

  refreshTypes = () => {
    this.getBoardYears();
    this.getFields();
  };

  refreshDocuments = async () => {
    const count = await client.fetch(`count(${BASE_QUERY})`, {
      year: this.state.year.value,
    });

    const documents = await client.fetch(
      `${BASE_QUERY} | order (${this.state.field.value} asc, order asc, _updatedAt desc)[0...${PAGE_SIZE}]`,
      { year: this.state.year.value }
    );

    this.setState({ documents, count });

    if (documents.length > 0) {
      await setListOrder(documents, this.state.field.value);
    }
  };

  isSafeToProceed = (documents, field, type) => {
    const shouldShowWarning = willUserOverrideData(documents, field.value);

    let shouldProceed = true;

    if (shouldShowWarning) {
      shouldProceed = window.confirm(
        `It looks like you are already storing data for:
 • Bios
 • Field: ${field.label}

Override existing data? This is a one-time operation and cannot be reversed.`
      );
    }

    return shouldProceed;
  };

  handleYearChange = async ({ value, label }) => {
    const count = await client.fetch(`count(${BASE_QUERY})`, {
      year: value,
    });

    const documents = await client.fetch(
      `${BASE_QUERY} | order (${this.state.field.value} asc, order asc, _updatedAt desc)[0...${PAGE_SIZE}]`,
      { year: value }
    );

    const shouldProceed = this.isSafeToProceed(documents, this.state.field, { value, label });

    if (documents && documents.length > 0 && shouldProceed) {
      // check if the first document has no order field
      const firstDocument = documents[0];
      const firstDocumentOrderField = firstDocument[this.state.field.value];
      const isFirstOrderUndefined = firstDocumentOrderField === undefined;

      // if the first document has an order field, the plugin has been used at least once, and so we want to put documents with no order at the front
      if (!isFirstOrderUndefined) {
        for (let i = documents.length; i > 0; i--) {
          const document = documents[i - 1];
          const orderField = document[this.state.field.value];
          const isOrderUndefined = orderField === undefined;

          if (isOrderUndefined) {
            documents.pop();
            documents.unshift(document);
          } else {
            break;
          }
        }
      }

      this.setState({ year: { value, label }, documents, count }, () => {
        this.getFields();
      });

      if (documents.length > 0) {
        await setListOrder(documents, this.state.field.value);
      }
    }
  };

  handleFieldChange = async ({ value, label }) => {
    const count = await client.fetch(`count(${BASE_QUERY})`, {
      year: this.state.year.value,
    });

    const documents = await client.fetch(
      `${BASE_QUERY} | order (${value} asc, order asc, _updatedAt desc)[0...${PAGE_SIZE}]`,
      { year: this.state.year.value }
    );

    const shouldProceed = this.isSafeToProceed(documents, { value, label }, this.state.type);

    if (shouldProceed) {
      this.setState({ field: { value, label }, documents, count });

      if (documents.length > 0) {
        await setListOrder(this.state.documents, value);
      }
    }
  };

  moveCard = async (beforeIndex, afterIndex) => {
    const card1 = this.state.documents[beforeIndex];
    const card2 = this.state.documents[afterIndex];

    this.setState({
      documents: update(this.state.documents, {
        $splice: [
          [beforeIndex, 1],
          [afterIndex, 0, card1],
        ],
      }),
    });

    await Promise.all([
      setOrder(card1._id, afterIndex, this.state.field.value),
      setOrder(card2._id, beforeIndex, this.state.field.value),
    ]);
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
              <TypeSection
                {...this.state}
                handleTypeChange={this.handleYearChange}
                handleFieldChange={this.handleFieldChange}
                refreshTypes={this.refreshTypes}
              />
              <DraggableSection
                documents={this.state.documents}
                count={this.state.count}
                type={this.state.type}
                moveCard={this.moveCard}
                refreshDocuments={this.refreshDocuments}
                loadMore={this.loadMore}
              />
            </div>
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default withRouterHOC(OrderDocuments);
