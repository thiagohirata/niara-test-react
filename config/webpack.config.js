const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[hash].js"
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [
            {
                oneOf: [
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx|mjs)$/,
                        exclude: /node_modules/,
                        rules: [
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: false
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1
                                }
                            }
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1
                                }
                            },
                            "sass-loader"
                        ]
                    },
                    {
                        type: "javascript/auto",
                        test: /[\\/]static[\\/]/,
                        loader: "file-loader",
                        options: {
                            name:
                                "static/[name].[hash:8].[ext]"
                        }
                    },
                    {
                        exclude: [
                            /\.(js|jsx|mjs)$/,
                            /\.html$/,
                            /\.json$/
                        ],
                        loader: "file-loader",
                        options: {
                            name:
                                "static/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin({}),
        new HtmlWebpackPlugin({
            title: "Niara Exam",
            template: path.resolve(
                __dirname,
                "../public/index.html"
            )
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "../public"),
        hot: true
    }
};
