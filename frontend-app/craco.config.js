//process.env.NODE_ENV = "development";
module.exports = {
  babel: {
    plugins: [
      [
        "styled-jsx/babel",
        { vendorPrefixes: false }
      ]
    ]
  },
  // webpack: {
  //   configure: (webpackConfig, { env, paths }) => {
  //     webpackConfig["mode"] = "development";
  //     return webpackConfig;
  //   }
  // }
};
