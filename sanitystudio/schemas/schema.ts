// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// Import the singleton schemas
import siteSettings from "./singletons/siteSettings"
import homePage from "./singletons/homePage"
import aboutPage from "./singletons/aboutPage"
import eventsPage from "./singletons/eventsPage"
import boardPage from "./singletons/boardPage"
import contactPage from "./singletons/contactPage"
import taskForcePage from "./singletons/taskForcePage"
import ykLeadershipProgramPage from "./singletons/ykLeadershipProgramPage"

// Import the document schemas
import bio from "./documents/bio"
import event from "./documents/event"
import boardYear from "./documents/boardYear"

// Import the object schemas
import portableText from "./objects/portableText"
import section from "./objects/section"
import buttonLink from "./objects/buttonLink"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: "default",
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        siteSettings,
        homePage,
        aboutPage,
        eventsPage,
        boardPage,
        contactPage,
        taskForcePage,
        ykLeadershipProgramPage,
        bio,
        event,
        boardYear,

        // Objects
        portableText,
        section,
        buttonLink
    ]),
})
