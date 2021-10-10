module.exports = {
	//处理 相对路径问题
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	productionSourceMap: false, //优化不要map文件
}

// const isPord = process.env.NODE_ENV === 'production'
// module.exports = {
//   publicPath: isPord ? './' : '/',  //处理 相对路径问题
//    productionSourceMap: false  // 优化不要map文件
// }