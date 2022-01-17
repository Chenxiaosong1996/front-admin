/**
 * 浏览器存储机制
 */

export class LocalStore {
    static get(key: string) {
        return JSON.parse(localStorage.getItem(key) || '{}') || {};
    }
    static set(key: string, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    static remove(key: string) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear()
    }
}

export class SessionStore {
    static get(key: string) {
        return JSON.parse(sessionStorage.getItem(key) || '{}') || {};
    }
    static set(key: string, value: string) {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    static remove(key: string) {
        sessionStorage.removeItem(key);
    }
    static clear() {
        sessionStorage.clear
    }
}

export class CookieStore {
    static set(key: string, val: string, hours: number = 2, path: string = '/') {//设置cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() + 1000 * 60 * 60 * hours); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toUTCString() + ";path=" + path;  //设置cookie
    }
    static get(key: string) {//获取cookie方法
        /*获取cookie参数*/
        var cookies = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = cookies.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  	//匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   	//将cookie的值赋给变量tips
                break;   		//终止for循环遍历
            }
        }
        return tips;
    }
    static del(key: string) { //删除cookie方法
        this.set(key, '', -24);
    }
}