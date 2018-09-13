import * as React from "react";
import FeatureComponent from "../home/FeatureComponent";

export default (props: any) => (
  <FeatureComponent
    item = {{
      title: props.entry.getIn(["data", "title"]),
      contents: props.entry.getIn(["data", "body"]),
      image: props.entry.getIn(["data", "image"]),
      description: props.entry.getIn(["data", "description"]),
      imagePosition: props.entry.getIn(["data", "imagePosition"]),
    }}
  />
);