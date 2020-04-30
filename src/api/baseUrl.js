let baseUrl = '';   //这里是一个默认的url，可以没有

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://test.ajia.cn';
    break;
  default:
    baseUrl = 'http://test.ajia.cn';
}

export default baseUrl