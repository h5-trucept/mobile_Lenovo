var ajax = function (method, url, data, onsuccess, onfail) {
    method = method.toUpperCase();//把请求方法转换成大写
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    //如果是get请求则拼接url
    if (method == "GET") {
        url = url + "?" + data;
    }
    xhr.open(method, url, true); //  url = xxx   data = (user=abc)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (typeof onsuccess == "function") {
                    onsuccess(xhr.responseText);  //
                }
            } else {
                if (typeof onfail == "function") {
                    onfail(xhr.responseText);
                }
            }
        }
    }
    if (method == "GET") {
        xhr.send(null);
    } else {
        // 表示自动对表单数据进行url编码
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
}