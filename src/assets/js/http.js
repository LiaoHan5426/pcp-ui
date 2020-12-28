import Axios from "axios";
import {Loading, Message} from "element-ui";
import da from "element-ui/src/locale/lang/da";

const basePath = '/api'

Axios.defaults.withCredentials = true;
//get请求
const get = (url, data, config) => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });

  let promise = Axios({
    url: basePath+url,
    method: 'get',
    params: data ? data : ''
  });
  loading.close();
  return promise;
};

//post
const post = (url, data) => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });

  let promise = Axios({
    url: basePath+url,
    method: 'post',
    // data: Qs.stringify(data ? data : {})
    data: data ? data : {}
  });
  loading.close();
  return promise;
};

// delete
const del = (url, data) => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });

  let promise = Axios({
    url: basePath+url+'/'+data,
    method: 'delete',
    // headers: {'Content-Type': 'application/json;charset=UTF-8'}
  });
  loading.close();
  return promise;
};

// put
const put = (url, data) => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });
  let promise = Axios({
    method: 'put',
    url: basePath+url,
    data: data,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  loading.close();
  return promise;
};

// 文件上传
const uploadFile = (url, data, files) => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('flies', files[i]);
  }
  formData.append("", JSON.stringify(data));
  let promise = Axios({
    method: 'post',
    url: basePath+url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  loading.close();
  return promise;
};

Axios.interceptors.request.use(config => {
  //所有请求执行之前都要执行的操作
  return config;
}, error => {
  //错误处理
  Message.error({message: ''});
  return Promise.resolve(error);
})


Axios.interceptors.response.use(data => {
  //所有请求完成后都要执行的操作

  let result = data.data;
  //第一种方式
  if (result.code === 200) {
    if (result.errors.length !== 0) {
      Message.error({message:result.errors[0].msg});
      result.data =null
    }
    return result;
  } else {
    Message.error({message:result.message});
    return result;
  }
},error => {
  if (error && error.response) {
    //请求出错
    switch (error.response.status) {
      case 400: error.message = '请求错误(400)'; break;
      case 401: error.message = '未授权，请重新登录(401)'; break;
      case 403: error.message = '拒绝访问(403)'; break;
      case 404: error.message = '请求出错(404)'; break;
      case 408: error.message = '请求超时(408)'; break;
      case 500: error.message = '服务器错误(500)'; break;
      case 501: error.message = '服务未实现(501)'; break;
      case 502: error.message = '网络错误(502)'; break;
      case 503: error.message = '服务不可用(503)'; break;
      case 504: error.message = '网络超时(504)'; break;
      case 505: error.message = 'HTTP版本不受支持(505)'; break;
      default:break;
    }
  }else {
    error.message='连接服务器失败!';
  }
  Message.error({message: error.message})
  return Promise.resolve(error)
})


export default {
  get,
  post,
  del,
  put,
  uploadFile
}

