import * as React from "react";
import FeatureComponent from "../home/FeatureComponent";
import NewsComponent from "../home/NewsComponent";

export default (props: any) => {
  let componentType: string = props.entry.getIn(["data", "component"]);
  return (
    <div>
      {
        componentType === "feature"
        ? <FeatureComponent
            item = {{
              title: props.entry.getIn(["data", "title"]),
              contents: props.entry.getIn(["data", "body"]),
              image: props.entry.getIn(["data", "image"]),
              description: props.entry.getIn(["data", "description"]),
              imagePosition: props.entry.getIn(["data", "imagePosition"]),
            }}
          />
        : <NewsComponent
            item={{
              title: props.entry.getIn(["data", "title"]),
              contents: props.entry.getIn(["data", "body"]),
              image: props.entry.getIn(["data", "image"]),
              description: props.entry.getIn(["data", "description"]),
            }}
          />
       }
    </div>
  );
};