import axios from "axios";

let request = axios.create({
    responseType: 'json',
    timeout: 300000,
    timeoutErrorMessage: '请求超时',
    token: ''
});
request.interceptors.request.use(config => {
        return new Promise(resolve => {
            // 模拟等待refresh_token
            setTimeout(function (config_param) {
                resolve(config_param);
            }, 2000, config)
        });
    });
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return error;
});


let zlaxios = {
    request: function (requestInfo) {
        let url =  requestInfo.url
        let method = requestInfo.method
        if(method === undefined || method === 'get'){
            request.get(url).then(reseponse=>{
                if(reseponse.request.status !== 200){
                    requestInfo.failed(reseponse)
                }else{
                    let code = reseponse.data.code;
                    if(code == '000000'){
                        requestInfo.success(reseponse.data)
                    }else{
                        requestInfo.failed(reseponse.data)
                    }
                }

            })
        }else{
            request.post(url,requestInfo.data).then(reseponse=> {
                if(reseponse.request.status !== 200){
                    requestInfo.failed(reseponse)
                }else{
                    let code = reseponse.data.code;
                    if(code == '000000'){
                        requestInfo.success(reseponse.data)
                    }else{
                        requestInfo.failed(reseponse.data)
                    }
                }
            })
        }

    }
}

export default zlaxios
