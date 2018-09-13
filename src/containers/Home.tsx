import React from "react";
import { withRouteData } from "react-static";
const convert = require("htmr");
import styles from "./home.css";
import FeatureComponent from "../home/FeatureComponent";
import NewsComponent from "../home/NewsComponent";
import Labels from "../home/LabelsComponent";
import * as _ from "lodash";
import ReactHelmet from "react-helmet";

export default withRouteData((props: any) => {
  let data: any = props.data;
  let content: Array<any> = [];
  let sortedKeys = _.sortBy(Object.keys(data));

  _.each(sortedKeys, (key: string) => {
    let firstLetter: string = key.match(/[a-zA-Z]/).toString();
    let componentType: string = key.substr(key.indexOf(firstLetter));
    if ( componentType === "Feature") {
      content.push(<FeatureComponent key={ key } item={ data[key] }/>);
    } else if (componentType === "News") {
      content.push(<NewsComponent key={ key } item={ data[key] }/>);
    } else if (componentType === "Labels") {
      content.push(<Labels key={ key } item={ data[key] }/>);
    }
  });
  let metaData: any = data["meta"];
  return (
      <div className={ styles.content }>
        {
          metaData && <ReactHelmet>
                          <title>Myriota - { metaData.title }</title>
                          <meta name="home:description" content={ metaData.description ? metaData.description : metaData.title }/>
                      </ReactHelmet>
        }
        {
          content.map((item) => item)
        }
      </div>
  );
});