import * as React from "react";
import FeatureComponent from "../home/FeatureComponent";

export default (props: any) => (
  <FeatureComponent
    item = {{
      title: props.entry.getIn(["data", "title"]),
      contents: props.widgetFor("body"),
      image: props.entry.getIn(["data", "image"]),
      imagePosition: props.entry.getIn(["data", "imagePosition"]),
    }}
  />
);