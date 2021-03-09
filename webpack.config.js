const HTMLWebPackPlugin         = require('html-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const path                      = require('path')
const dotenv                    = require('dotenv')
const webpack                   = require('webpack')

module.exports = ()=>{

    const env       = dotenv.config().parsed;
    const envKeys   = Object.keys(env).reduce((prev, next)=>{
        prev[`process.env.${next}`]  = JSON.stringify(env[next]);
        return prev
    }, {});

    return{
        mode    : process.env.NODE_ENV,
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
                },{
                    test: /\.png$/,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }),
            new HTMLWebPackPlugin({
                template    : './src/index.html',
                filename    : '../views/index.html',
                publicPath  : '/'
            }),
            new CopyWebpackPlugin({
                patterns:[
                    {
                        from: './src/public',
                        to: './'
                    }
                ]
            })
        ],
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'build/public'),
        }
    }
}