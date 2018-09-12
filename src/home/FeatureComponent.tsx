//  Copyright 2018
//  Myriota Pty Ltd
//  Myriota Confidential

import React from "react";
const convert = require("htmr");
import "./styles.css";

export interface IFeatureComponentProps {
    item: any;
}
export default class FeatureComponent extends React.Component<IFeatureComponentProps, any> {
    render () {
        return (
            <div className="post">
                <h1>{ this.props.item.title }</h1>
                {
                    this.props.item.imagePosition !== "right"
                    && this.props.item.image
                    &&  <div className="mainImage">
                            <img src={ this.props.item.image } alt="main-image"/>
                        </div>
                }
                <div> { convert(this.props.item.contents) }</div>
                {
                    this.props.item.imagePosition === "right"
                    && this.props.item.image
                    &&  <div className="mainImage">
                            <img src={ this.props.item.image } alt="main-image"/>
                        </div>
                }
            </div>
        );
    }
}