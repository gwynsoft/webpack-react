const path = require("path"); // built-in module needed to resolve paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Generates a html file in dist with all components included
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"), // Where to put the generated files
    filename: "bundle.js", // Name of generated file
    clean: true, // Clears the dist directory before writing new files
  },
  devtool: "source-map", // Allows us to see errors with the correct file &line number
  devServer: {
    port: 3000,
    watchFiles: ["src/*/*", "public/*/*"], // was watchContentBase
    open: true, // Opens a browser automatically
    hot: true, // Enable hot reloading
  },
  module: {
    rules: [
      {
        // Javascript and JSX files
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
          options: {
            compact: false,
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        // CSS files
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new MiniCssExtractPlugin(),
  ],
};
