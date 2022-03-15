import { environment } from '@env/environment';
const userAgent = navigator.userAgent;

class Track {
  httpRequest(paramObj: any, fun: Function, errFun: Function) {
    // 创建XMLHttpRequest对象，
    let xmlhttp: XMLHttpRequest = new XMLHttpRequest();

    /* 判断是否支持请求 */
    if (xmlhttp == null) {
      alert('你的浏览器不支持XMLHttp');
      return;
    }
    /* 请求方式，并且转换为大写 */
    var httpType = (paramObj.type || 'GET').toUpperCase();
    /* 数据类型 */
    var dataType = paramObj.dataType || 'json';
    /* 请求接口 */
    var httpUrl = paramObj.httpUrl || '';
    /* 是否异步请求 */
    var async = paramObj.async || true;
    /* 请求参数--post请求参数格式为：foo=bar&lorem=ipsum */
    var paramData = paramObj.data || {};
    var requestData = '';
    for (var name in paramData) {
      requestData += name + '=' + paramData[name] + '&';
    }
    requestData = requestData === '' ? '' : requestData.substring(0, requestData.length - 1);
    // var requestData = new FormData()
    // for (var name in paramData) {
    //   requestData.append(name, paramData[name])
    // }
    /* 请求接收 */
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          /* 成功回调函数 */
          fun(xmlhttp.responseText);
          if (dataType === 'json') {
            fun(JSON.parse(xmlhttp.responseText));
          }
        } else {
          /* 失败回调函数 */
          errFun(xmlhttp.statusText);
        }
      }
    };

    /* 接口连接，先判断连接类型是post还是get */
    if (httpType === 'GET') {
      xmlhttp.open('GET', httpUrl, async);
      xmlhttp.send(null);
    } else if (httpType === 'POST') {
      xmlhttp.open('POST', httpUrl, async);

      // 发送合适的请求头信息
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send(requestData);
    }
  }

  send(data: { url: string; method: string; code: number; body?: string; message?: string; result?: any }) {
    /* 请求参数 */
    var req = {
      httpUrl: `${environment.api[environment.api.default].baseUrl}/log/track`,
      type: 'POST',
      data: {
        ...data,
        userAgent
      }
    };
    /* 请求调用 */
    this.httpRequest(
      req,
      () => {
        // 这里编写成功的回调函数
        console.log('LOGGER: requestError');
      },
      (msg: string) => {
        console.log('前端日志存储网络错误,', msg);
      }
    );
  }
}
export default Track;
