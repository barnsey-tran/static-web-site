//  Copyright 2018
//  Myriota Pty Ltd
//  Myriota Confidential

import React from "react";
const convert = require("htmr");
import "./labelStyles.css";

export interface ILabelsComponentProps {
    item: any;
}
export default class LabelsComponent extends React.Component<ILabelsComponentProps, any> {

    render () {
        return (
            <div className="labels">
                <h3>{ this.props.item.title }</h3>
                <div className="labelsContent">
                    {
                        this.props.item.labels && this.props.item.labels.map((i: any) => {
                            return  <div key={i.label} className="label">
                                        <img className="labelImage" src={ i.image } alt={ i.label }/>
                                        <div className="labelFont" >{ i.label }</div>
                                    </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}