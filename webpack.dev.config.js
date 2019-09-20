const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"), //obtiene la direccion root de nuestro proyecto y
    filename: "js/bundle-[name].js", //[name] obtiene el nombre del entry para guardarlo con ese nombre
    publicPath: "http://localhost:3000/", //consumimos los archivos desde nuestra ruta de desarrollo
    chunkFilename: "js/[id].[chunkhash].js" //perzonaliza el nombre de los  chunks
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 3000,
    hot: true
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
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|svg|gif|woff|eot|ttf|mp4|webm)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/" //90KB. Lo recomendado como maximo es 100KB
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //es conveniente no cambiarle de nombre al archivo
      template: path.resolve(__dirname, "public/index.html") //toma como base este index
      //(el cual no es el que está dist/ obviamente)  para crear el archivo anterior.
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
