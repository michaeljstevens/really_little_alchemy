module.exports = {
  entry: "./lib/js/board.js",
  output: {
    path: "lib/js",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-core',
      }
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
