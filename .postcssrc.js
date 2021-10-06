module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {    // 如果将来是自己的设计图(750px)，直接写75即可！ 就可以设计图是多少px，css书写就写多少px  
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
          // 配置不要转换的样式资源
          exclude: 'github-markdown'  // 增加这一句！
    },
  },
};