const HTMLWebPackPlugin         = require('html-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const path                      = require('path')

module.exports = {
    mode    : 'development',
    devtool : 'inline-source-map',
    module: {
        rules: [
            {
                test    : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use     : {
                    loader  : 'babel-loader',
                }
            },{
                test: /\.css$/,
                use : ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HTMLWebPackPlugin({
            template    : './src/index.html',
            filename    : '../views/index.html',
            publicPath  : '/'
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build/public'),
    }
}