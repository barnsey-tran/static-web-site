var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fileNameConfig = "index.[hash].js";
var path = require("path");

// Needs to be valid JSON. All comments in tsconfig.json must be removed.

// config plugins
var webPackPlugins = [
    // inject style sheet and bundle.js into index.html
    new HtmlWebpackPlugin({
        template: "./src/cms/index.html"
    }),
     // inject global variable into react app
     new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }),
    // configure css file name
    new ExtractTextPlugin({
        filename: "styles.[hash].css"
    })
];

var postCSSConfig = [
    {
        loader: "css-loader",
        options: {
            modules: true,
            import: false,
            importLoaders: 1,
            localIdentName: "[name]_[local]_[hash:base64:5]"
        }
    },
    {
        loader: "postcss-loader",
        options: {
            config: {
                path: "./postcss.config.js"
            }
        }
    }
];

module.exports = {
    entry: "./src/cms/cms.tsx",
    output: {
        path: __dirname + "/public/admin",
        filename: fileNameConfig,
        libraryTarget: "umd"
    },
    devtool: false,
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
        modules: [
            path.resolve("./node_modules")
        ]
    },
    resolveLoader: {
        modules: ["./node_modules"]
    },
    plugins: webPackPlugins,
    // exclude these dependencies from the output
    externals: {
        // netlify should already have react
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
        },
        // index.html already include netlify-cms
        // "netlify-cms": {
        //     commonjs: "netlify-cms",
        //     commonjs2: "netlify-cms",
        //     amd: "NetlifyCMS",
        //     root: "NetlifyCMS"
        // }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components|node_modules\/react)/, // as std jsLoader exclude
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: postCSSConfig
                })
            }
        ]
    }
};
