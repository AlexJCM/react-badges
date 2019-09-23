const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"), //obtiene la direccion root de nuestro proyecto y
    filename: "js/bundle-[name].[hash].js", //[name] obtiene el nombre del entry para guardarlo con ese nombre
    publicPath: "http://localhost:3001/", //en donde voy a buscar los archivos
    chunkFilename: "js/[id].[chunkhash].js" //perzonaliza el nombre de los  chunks
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg|gif|woff|eot|ttf|mp4|webm)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000, //10KB. Lo recomendado como maximo es 100KB
            name: "[hash].[ext]",
            outputPath: "assets"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css" //para partir mis archivos de manera optimizada cuando se repitan
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", //es conveniente no cambiarle de nombre al archivo
      template: path.resolve(__dirname, "public/index.html") //toma como base este index
      //(el cual no es el que está dist/ obviamente)  para crear el archivo anterior.
    }),
    //esto a a consumir el dll generado por el archivo webpack.dll.config
    new webpack.DllReferencePlugin({
      manifest: require("./modules-manifest.json") //el archivo que será cargado en la compilación
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "dist/js/*.dll.js"), //importa todos los modules terminados en .dll.js
      //ya que no sabemos ni el nombre ni el hash
      outputPath: "js", //donde libero esos archivos
      publicPath: "http://localhost:3001/js"
    }),
    //
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["**/app.**"]
    })
  ]
};
