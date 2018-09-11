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
                        if (key !== "meta") {
                            let post: any = data[key];
                            return <PostReviewComponent
                                key={ post.id }
                                contents={ post.contents }
                                title={ post.title }
                                image={ post.image }
                                link={ <Link to={ "/news/" + post.id }>Read more</Link>}
                                helmet={
                                    <ReactHelmet>
                                        <meta name={"news:post:" + post.id} content={ post.description }/>
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