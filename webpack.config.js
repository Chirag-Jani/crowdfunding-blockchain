// const HDWalletProvider = require("@truffle/hdwallet-provider");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  // networks: {
  //   goerli: {
  //     provider: function () {
  //       return new HDWalletProvider(
  //         mnemonic,
  //         "https://goerli.infura.io/v3/1941fd7646334257ac0c71b8230447d2>"
  //       );
  //     },
  //     network_id: 3,
  //   },
  // },
};
