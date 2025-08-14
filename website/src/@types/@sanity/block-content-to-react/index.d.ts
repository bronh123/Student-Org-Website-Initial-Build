declare module "@sanity/block-content-to-react" {
    import { Block } from "@sanity/types"

    interface SerializerProps {
        types: Object
        marks: Object

        // Less common overrides
        list: Function
        listItem: Function

        // Low-level serializers
        block: Function
        span: Function
    }

    interface BlockContentProps {
        className?: string
        ignoreUnknownTypes?: boolean

        // When rendering images, we need project id and dataset, unless images are materialized
        projectId?: string
        dataset?: string
        imageOptions?: Object

        serializers?: SerializerProps

        blocks: Block[] | Block
    }

    export default function BlockContent(props: BlockContentProps): JSX.Element
}
