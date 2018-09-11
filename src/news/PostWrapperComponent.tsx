import React from "react";
import { withRouteData, Link } from "react-static";
import ReactHelmet from "react-helmet";
import PostReviewComponent from "../news/PostReviewComponent";

export default withRouteData((props: any) => {
    return <PostReviewComponent
        title={props.title}
        contents={ props.contents}
        image={ props.image }
        helmet={
            <ReactHelmet>
                <title>{ props.title }</title>
                <meta name="news:blog:description" content={ props.description }/>
            </ReactHelmet>
        }
        />;
});