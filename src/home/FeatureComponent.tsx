//  Copyright 2018
//  Myriota Pty Ltd
//  Myriota Confidential

import * as React from "react";
const convert = require("htmr");
import "./styles.css";

export interface IFeatureComponentProps {
    item: any;
}
 class FeatureComponent extends React.Component<IFeatureComponentProps, any> {
    constructor(props: any) {
        super(props);
    }
    render () {
        console.log("Rendering Feature Component");
        return (
            <section className="feature">
                <h1>{ this.props.item.title }</h1>
                <div className="post">
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
            </section>
        );
    }
}

export default FeatureComponent;