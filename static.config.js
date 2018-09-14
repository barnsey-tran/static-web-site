// markdown stuffs
import path from "path";
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

// configure path of assets for jdown
const assetsConfig = {
  path: "/public/assets",
  output: "/assets/"
};

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
    const home = await jdown("content/home", { assets: assetsConfig });
    const news = await jdown("content/news", { assets: assetsConfig });
    return [
      {
        path: "/",
        component: "src/containers/Home",
        getData: () => {
          return ({
            data: home
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
    // modify css default loaders
    // to create unique css class names
    const cssLoader  = _.find(defaultLoaders.cssLoader.loader, (dl) => {
      return dl.loader === "css-loader";
    });
    cssLoader.options = { ... cssLoader.options, ...{ modules: true, localIdentName: "[name]_[local]_[hash:base64:5]"}};

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
      }
    ];

    config.plugins.push(new ExtractTextPlugin("styles.css"));
    return config;
  },
};
