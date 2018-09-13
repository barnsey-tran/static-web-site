//  Copyright 2018
//  Myriota Pty Ltd
//  Myriota Confidential

import React from "react";
const convert = require("htmr");
import styles from "./newsStyles.css";

export interface INewsComponentProps {
    item: any;
}
export default class NewsComponent extends React.Component<INewsComponentProps, any> {

    render () {
        return (
            <div className={ styles.news }>
                <div className={ styles.mainImage }>
                    { this.props.item.image && <img src={ this.props.item.image } alt="main-image"/> }
                </div>
                <div> { convert(this.props.item.contents) }</div>
                <a className={ styles.linkButton } target="_blank" href="http://myriota.com/">Learn More </a>
            </div>
        );
    }
}