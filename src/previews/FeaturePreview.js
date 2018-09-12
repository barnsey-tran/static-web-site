import React from "react";
import FeatureComponent from "../home/FeatureComponent";

const FeaturePreviewComponent = ({ entry, widgetFor }) => (
  <FeatureComponent
    item = {{
      title: entry.getIn(["data", "title"]),
      contents: widgetFor("body"),
      image: entry.getIn(["data", "image"]),
      imagePosition: entry.getIn(["data", "imagePosition"]),
    }}
  />
);

export default FeaturePreviewComponent;
