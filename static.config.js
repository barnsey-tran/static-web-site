import path from "path";
// markdown stuffs
import { reloadRoutes } from "react-static/node";
import jdown from "jdown";
import marked from "marked";
import chokidar from "chokidar";
import { render } from "react-dom/index.js";
import Helmet  from "react-helmet";
import * as _ from "lodash";
import fs from "fs";
import klaw from "klaw";
import matter from "gray-matter";

// watch markdown content
chokidar.watch("content").on("all", () => reloadRoutes());

function setChildren(newsData) {
  let result = [];

  _.sortBy(Object.keys(newsData)).map((key) => {
    if (key !== "meta") {
      const post = newsData[key];
      result.push({
        path: `/${ post.id }`,
        component: "src/news/PostWrapperComponent",
        getData: () => ({
            contents: post.contents,
            title: post.title,
            image: post.image,
            description: post.description
        })
      });
    }
  });

  return result;
}


function getPosts () {
  const items = [];
  // Walk ("klaw") through posts directory and push file paths into items array //
  const getFiles = () => new Promise(resolve => {
    // Check if posts directory exists //
    if (fs.existsSync("./content/tests")) {
      klaw("./content/tests")
        .on("data", item => {
          // Filter function to retrieve .md files //
          if (path.extname(item.path) === ".md") {
            // If markdown file, read contents //
            const data = fs.readFileSync(item.path, "utf8");
            // Convert to frontmatter object and markdown content //
            const dataObj = matter(data);
            // Create slug for URL //
            dataObj.data.slug = dataObj.data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            // Remove unused key //
            delete dataObj.orig;
            // Push object into items array //
            items.push(dataObj);
          }
        })
        .on("error", e => {
          console.log(e);
        })
        .on("end", () => {
          // Resolve promise for async getRoutes request //
          // posts = items for below routes //
          resolve(items);
        });
    } else {
      // If src/posts directory doesn"t exist, return items as empty array //
      resolve(items);
    }
  });
  return getFiles();
}

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require("./webpack.config.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
  entry: path.join(__dirname, "src", "index.tsx"),
  getSiteData: () => ({
    title: "React Static",
  }),
  getRoutes: async () => {
    // load markdown contents
    const home = await jdown("content/home");
    const news = await jdown("content/news");
    const tests = await getPosts();
    return [
      {
        path: "/",
        component: "src/containers/Home",
        getData: () => {
          return ({
            data: home,
            tests: tests
          });
        },
      },
      {
        path: "/news",
        component: "src/containers/News",
        getData: () => ({
          data: news
        }),
        children: setChildren(news)
      },
      {
        is404: true,
        component: "src/containers/404",
      },
    ];
  },
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push(".ts", ".tsx");

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias;

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: "babel-loader",
              },
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ];

    config.plugins.push(new ExtractTextPlugin("styles.css"));
    return config;
  },
};