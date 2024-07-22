const { override } = require("customize-cra");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

const overrideEntry = (config) => {
  config.entry = {
    main: "./src",
    background: "./src/background",
    content: "./src/content",
  };

  return config;
};

const overrideOutput = (config) => {
  config.output = {
    ...config.output,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].js",
  };

  return config;
};

const injectEnvVariables = () => (config) => {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ]);
  return config;
};

module.exports = {
  webpack: (config) =>
    override(overrideEntry, overrideOutput, injectEnvVariables())(config),
};
