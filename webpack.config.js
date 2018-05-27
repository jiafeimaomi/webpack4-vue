const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const CopyWebpackPlugin = require("copy-webpack-plugin");

// console.log('process', process.env, process.env.NODE_ENV)
// console.log('__dirname:', __dirname, path.resolve(__dirname, './src'))

module.exports = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				// options: {
				// 	presets: ['env']
				// }
			},
			// 样式文件加载顺序：https://blog.csdn.net/tjj3027/article/details/79885335
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
								config: {
								path: './postcss.config.js'
							}
						}
					}
				]
			},
			{
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,// 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'dist/images' // 图片打包后存放的目录
                        }
                    }
                ]
            },
			{
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
		]
	},
	//webpack-dev-server 搭建本地服务器，配置项如下：
	//webpack-dev-server用法详解：http://www.css88.com/doc/webpack2/configuration/dev-server/
	devServer: {
		contentBase: path.join(__dirname, "dist"), //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
		compress: true, //启用gzip压缩
		port: 9000 //服务器端口设置
	},
	plugins: [
		new UglifyJSPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		//html-webpack-plugin用法全解：https://segmentfault.com/a/1190000007294861
		new HtmlWebpackPlugin({ 
			title: 'index', //设置生成的 html 文件的标题
			template: './src/index.html', //生成 html 文件的文件名。默认为 index.html.
			filename:'index.html', //根据指定的模板文件来生成特定的html文件。模板类型可以是 html, jade, ejs, hbs等等，使用自定义的模板文件需要提前安装对应的loader否则webpack不能正确解析
			inject: true, //注入选项。有四个选项值 true, body, head, false.
			chunks:['index', 'vendor', 'runtimechunk~index'],
			hash: false,
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: false //删除空白符与换行符
			}
			// chunks: ['index']
		}),
		new HtmlWebpackPlugin({ 
			title: 'test', //设置生成的 html 文件的标题
			template: './src/pages/test/test.html', //生成 html 文件的文件名。默认为 index.html.
			filename:'test.html', //根据指定的模板文件来生成特定的html文件。模板类型可以是 html, jade, ejs, hbs等等，使用自定义的模板文件需要提前安装对应的loader否则webpack不能正确解析
			inject: true, //注入选项。有四个选项值 true, body, head, false.
			chunks:['test', 'vendor', 'runtimechunk~test'],
			hash: false
			// chunks: ['test']
		}),
		new VueLoaderPlugin(), //处理vue文件解析成js文件
		new MiniCssExtractPlugin({ //单独抽离css文件
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		//拷贝资源插件
		// new CopyWebpackPlugin([{
		// 		from: __dirname + '/src'
		// }])
	],
	// entry: './src/index.js', //入口文件
	entry :{//配置多页面入口
		index: './src/index.js',
		test: './src/pages/test/test.js'
	},
	output: { //输出文件
		//hash:代表的是编译的hash值，而不是具体的项目文件计算所得，所有的文件的名的hash值都是一样，若任何一个js文件改动，都会影响其它文件名称改动（即hash值改动），因此其它文件的缓存也会破坏
		//chunkhash：代表的是chunk的hash值，是根据具体模块文件的内容计算所得的hash值，某个文件的改动只会影响它本身的hash指纹，不会影响其他文件。
		filename: '[name].[hash].js', //开发：[name].[hash].js， 打包：[name].[chunkhash].js
		chunkFilename: '[name].[hash].js', //开发：[name].[hash].js， 打包：[name].[chunkhash].js
		path: path.resolve(__dirname, 'dist')
	},
	devtool: '#cheap-module-eval-source-map',
	optimization: {
		minimize: false,
		 splitChunks: {
            chunks: "initial", //只对入口文件， initial初始块/async按需块/all所有块, 默认为all
            // automaticNameDelimiter: '~', //generate names using origin and name of the chunk, like vendors~index~test.js
            name: 'vendor',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
            default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true //allows to reuse existing chunks instead of creating a new one when modules match exactly.
                }
            }
        },
		runtimeChunk: {
			name: entrypoint => `runtimechunk~${entrypoint.name}`
		}
	},
	resolve: {
		//Node.js指令行执行文件查找规则 https://blog.csdn.net/colin5300/article/details/38958753
		//node中模块查找顺序：https://blog.csdn.net/w_vc_love/article/details/51137948
		extensions: ['.vue', '.js', '.json', '*'],  
		//配置别名时，在配置模块别名时，注意在别名前加“~”，告知加载器这是一个模块而不是相对路径
		alias: {
			'vue': 'vue/dist/vue.js' , //https://blog.csdn.net/fengjingyu168/article/details/72911421
			'~@': path.resolve(__dirname, './src'), //http://www.php.cn/js-tutorial-384933.html
			//vue-html-loader and css-loader translates non-root URLs to relative paths. In order to treat it like a module path, prefix it with ~
			//注意: 只有在template中的静态文件地址和style中的静态文件地址需要加~, 在script里的, 别名定义成什么就写什么
			'assets': path.resolve(__dirname, './src/assets')
		}
	},
	mode: 'development' 
};
