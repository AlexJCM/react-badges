const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    modules: ["react", "react-dom", "react-router-dom"]
  },
  output: {
    path: path.resolve(__dirname, "dist"), //obtiene la direccion root de nuestro proyecto y
    //guardara en dist/js
    filename: "js/[name].[hash].dll.js", //[name] obtiene el nombre del entry para guardarlo con ese nombre
    library: "[name]"
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]", //nombre de la función dll expuesta
      path: path.join(__dirname, "[name]-manifest.json") //generara el archivo json(salida)
    })
  ]
};
