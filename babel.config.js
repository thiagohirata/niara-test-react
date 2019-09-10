const path = require("path");

module.exports = function(api) {
    const isTest = api.env("test");

    const config = {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react"
        ],
        plugins: [
            !isTest &&
                "transform-inline-environment-variables",
            "minify-dead-code-elimination",
            "react-hot-loader/babel",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-async-to-generator",
            [
                "module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        "@": "./src"
                    }
                }
            ]
        ].filter(x => x)
    };

    return config;
};
