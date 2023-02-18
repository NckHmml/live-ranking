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
    "styled-jsx/babel",
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
