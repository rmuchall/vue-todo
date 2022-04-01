/// <reference types="./webpack-config" />
// https://github.com/TypeStrong/ts-node#help-my-types-are-missing
import path from "path";
import {Configuration, EnvironmentPlugin, ProgressPlugin, DefinePlugin} from "webpack";
import "webpack-dev-server"; // Required for typings
import {VueLoaderPlugin} from "vue-loader";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import BundleAnalyzerPlugin from "webpack-bundle-analyzer/lib/BundleAnalyzerPlugin";
import {CacheBustPlugin} from "../../../OpenSource/cache-bust-plugin/src/CacheBustPlugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require(path.resolve(process.cwd(), `config/${process.env["NODE_ENV"]}-env`));

const webpackConfig: Configuration = {
    mode: process.env["NODE_ENV"] as any,
    target: "web",
    entry: {
        app: "./src/main.ts"
    },
    // Clean up source maps
    // https://www.mistergoodcat.com/post/the-joy-that-is-source-maps-with-vuejs-and-typescript
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        devtoolModuleFilenameTemplate: (info: any) => {
            let $filename = `sources://${info.resourcePath}`;
            if (info.resourcePath.match(/\.vue$/) && !info.query.match(/type=script/)) {
                $filename = `webpack-generated:///${info.resourcePath}?${info.hash}`;
            }
            return $filename;
        },
        devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]"
    },
    devtool: process.env["NODE_ENV"] === "development" ? "eval-cheap-module-source-map" : false,
    module: {
        rules: [
            {
                // Vue single file components
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                // TypeScript
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }
            },
            {
                // HTML
                test: /\.html$/,
                exclude: /index\.html$/,
                use: "html-loader"
            },
            {
                // CSS
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            // Do not process urls that use a root path
                            // These may be static resources that do not need
                            // to be processed by Webpack (fonts/images etc)
                            url: {
                                filter: (url: string) => !url.startsWith("/")
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-import",
                                    "tailwindcss",
                                    process.env["NODE_ENV"] === "production" ? "autoprefixer" : false
                                ],
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new EnvironmentPlugin(envConfig),
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                extensions: {
                    vue: {
                        enabled: true,
                        compiler: "vue/compiler-sfc"
                    }
                },
                mode: "readonly"
            },
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                "favicon.ico",
                "images/**/*"
            ]
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env["NODE_ENV"] === "development" ? "disabled" : "static",
            openAnalyzer: false
        }),
        new ProgressPlugin({
            activeModules: true
        }),
        new CacheBustPlugin(),
    ],
    optimization: {
        minimize: process.env["NODE_ENV"] === "production",
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false
                }
            }),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    enforce: true,
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm-bundler.js",
            // Resolve shared-x
            // Note that dollar is omitted
            // path.resolve must be used here
            "shared-server": path.resolve(__dirname, "../shared-server"),
            "shared-web": path.resolve(__dirname, "../shared-web"),
        },
        extensions: [".ts", ".js", ".vue"],
    },
    // https://localhost/webpack-dev-server
    devServer: {
        port: 5002,
        server: {
            type: "http"
        },
        client: {
            overlay: true
        }
    }
};

export default webpackConfig;
