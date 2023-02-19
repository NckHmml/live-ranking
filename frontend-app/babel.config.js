// Babel configuration for the node SSR, pure web build still goes through craco/CRA
module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        modules: "commonjs",
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    [
      "styled-jsx/babel",
      { vendorPrefixes: false }
    ],
    [
      "@babel/plugin-proposal-decorators",
      { version: "legacy" }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      { loose: true }
    ],
    "@babel/plugin-transform-react-jsx"
  ]
};
