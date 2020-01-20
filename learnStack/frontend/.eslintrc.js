module.exports = {
  "root": true,
  "env": {
    "node": true,
    "mocha":true,
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  //配置全局忽略的变量
  "globals": {
    "window": true
  },
  "rules": {
    //禁止输入console
    "no-console": "error",
    "no-alert": "error",
    //禁止输入分号
    "semi": [
      "error",
      "never"
    ],
    //必须使用单引号
    "quotes":[
      "error",
      "single"
    ],
    //首行缩进两个空格
    "indent": [
      "error",
      2
    ],
    //换行使用unix换行
    "linebreak-style": [
      "error",
      "unix"
    ]
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
};