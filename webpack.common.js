// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin=require('eslint-webpack-plugin')
const path=require('path');

module.exports={
    entry:'./src/index.js',
    output:{
       filename:'[contentHash].bundle.js',
       path:path.resolve(__dirname,'dist'),
       clean:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new EslintPlugin()
    ],
   
    module:{
        rules:[
            {
              test:/\.css$/i,
              use:['style-loader','css-loader']
            },
            {
              test: /\.(png|jpg|jpeg|gif|svg)$/i,
              use: [
                {
                    loader:'file-loader',
                    options:{
                        outputPath:'images',
                    }
                }
              ]
            }
        ]
    }
}