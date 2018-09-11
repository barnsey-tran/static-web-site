//  Copyright 2018
//  Myriota Pty Ltd
//  Myriota Confidential

import React from "react";
const convert = require("htmr");
import "./postReviewStyles.css";

export interface IPostComponentProps {
    title: string;
    contents: any;
    image?: string;
    helmet?: any;
    link?: any;

}
export default class PostComponent extends React.Component<IPostComponentProps, any> {

    render () {
        return (
            <section className="postReview">
                {/* meta data */}
                { this.props.helmet ? this.props.helmet : "" }
                <h2>{ this.props.title }</h2>
                <div className="postImage">
                    { this.props.image && <img src={ this.props.image }/> }
                </div>
                <div>
                    { this.props.contents ? convert(this.props.contents) : "" }
                </div>
                <div>
                    { this.props.link }
                </div>
            </section>
        );
    }
}