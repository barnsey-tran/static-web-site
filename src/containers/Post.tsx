import React from "react";
import { withRouteData, Link } from "react-static";
import { Post } from "../types";
const convert = require("htmr");

interface Props {
  post: Post;
}

export default withRouteData(({ post }: Props) => (
  <div>
    <Link to="/news/">{"<"} Back</Link>
    <br />
    <p>{ convert(post.contents) }</p>
  </div>
));