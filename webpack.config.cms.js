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
    // configure css file name
    // no hash because file name is hardcoded in cms registration
    new ExtractTextPlugin({
        filename: "preview_styles.css"
    })
];

var cssLoaderConfig = [
    {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            modules: true,
            minimize: true,
            sourceMap: true,
            localIdentName: "[name]_[local]_[hash:base64:5]",
            minimize: true
        }
    }
];

module.exports = {
    entry: "./src/cms/cms.tsx",
    output: {
        path: __dirname + "/public/admin",
        filename: fileNameConfig
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
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/, // as std jsLoader exclude
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: cssLoaderConfig
                })
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
        ]
    }
};
