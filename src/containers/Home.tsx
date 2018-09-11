import React, { Fragment } from "react";
import { withRouteData } from "react-static";
const convert = require("htmr");
import "./home.css";
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
    if (key.substr(1) === "Feature") {
      content.push(<FeatureComponent key={ key } item={ data[key] }/>);
    } else if (key.substr(1) === "News") {
      content.push(<NewsComponent key={ key } item={ data[key] }/>);
    } else if (key.substr(1) === "Labels") {
      content.push(<Labels key={ key } item={ data[key] }/>);
    }
  });
  let metaData: any = data["meta"];
  return (
      <div>
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