import * as React from "react";
import PostReviewComponent from "../news/PostReviewComponent";

export default (props: any) => (
    <PostReviewComponent
        title= { props.entry.getIn(["data", "title"]) }
        contents = { props.entry.getIn(["data", "body"]) }
        image = { props.entry.getIn(["data", "image"]) }
    />
);