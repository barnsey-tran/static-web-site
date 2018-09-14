import React from "react";
import { withRouteData, Link } from "react-static";
import ReactHelmet from "react-helmet";
import PostReviewComponent from "../news/PostReviewComponent";
import * as _ from "lodash";

interface Props {
    data: any;
}

export default withRouteData((props: Props) => {
    let metaData: any = props.data.meta;
    let data: any = props.data;
    let sortedKeys = _.sortBy(Object.keys(data));
    return (
        <div>
            { metaData && <ReactHelmet>
                              <title>Myriota - { metaData.title }</title>
                              <meta name="news:description" content={ metaData.description ? metaData.description : metaData.title }/>
                          </ReactHelmet>
            }
            <h1>Latest News</h1>
            <div>
                {
                    sortedKeys.map((key: string) => {
                            let post: any = data[key];
                            if (post.title) {
                                return <PostReviewComponent
                                    key={ key }
                                    contents={ post.contents }
                                    title={ post.title }
                                    image={ post.image }
                                    link={ <Link to={ "/news/" + key }>Read more</Link>}
                                    helmet={
                                        <ReactHelmet>
                                            <meta name={"news:post:" + key} content={ post.description }/>
                                        </ReactHelmet>
                                        }
                                    />;
                            }
                    })
                }
            </div>
        </div>
    );
});