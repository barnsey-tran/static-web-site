//  Copyright 2018
//  Myriota Pty Ltd
//  Myriota Confidential

import * as React from "react";
const convert = require("htmr");
import styles from "./styles.css";

export interface IFeatureComponentProps {
    item: any;
}
 class FeatureComponent extends React.Component<IFeatureComponentProps, any> {
    constructor(props: any) {
        super(props);
    }
    render () {
        return (
            <section className={styles.feature}>
                <h1>{ this.props.item.title }</h1>
                <div className={styles.post}>
                    {
                        this.props.item.imagePosition !== "right"
                        && this.props.item.image
                        &&  <div className={styles.mainImage}>
                                <img className={ styles.image } src={ this.props.item.image } alt="main-image"/>
                            </div>
                    }
                    <div> { convert(this.props.item.contents) }</div>
                    {
                        this.props.item.imagePosition === "right"
                        && this.props.item.image
                        &&  <div className={styles.mainImage}>
                                <img className={ styles.image } src={ this.props.item.image } alt="main-image"/>
                            </div>
                    }
                </div>
            </section>
        );
    }
}

export default FeatureComponent;