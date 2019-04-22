- [axios Github](https://github.com/axios/axios)

- 以下是个人 文档总结，仅供参考，如有错误，及时指正

### 一、基础说明

- Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中，特征如下：
    - 从浏览器中创建 XMLHttpRequests

    - 从 node.js 创建 http 请求

    - 支持 Promise API

    - 拦截请求和响应

    - 转换请求数据和响应数据

    - 取消请求

    - 自动转换 JSON 数据

    - 客户端支持防御 XSRF



- 兼容如下：
    ![](mweb-img/2018-06-03-15279934320366.jpg)



- 安装：
    - use npm
    
    ```
    $ npm install axios
    ```
    
    - use bower

    ```
    $ bower install axios
    ```

    - use cdn

    ```
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    ```

### 二、axios 实例 回调函数

#### 1. then、catch 回调

- Axios 发送请求，返回一个 Promise 对象，所以可调用 then、catch 方法

    - 正确响应，执行 then 方法（参数为 reponse 对象）

    - 错误响应，执行 catch 方法（参数为 error 对象）


#### 2. 正确 响应体 response

- 以 get 请求为例

    ```
    axios.get('/user/12345')
      .then(function(response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });
    ```
    
#### 3. 错误 响应体 error

- 以 get 请求为例

    ```
    axios.get（'/ user / 12345'）
       .catch（function（error）{
         if（error.response）{
           //请求已发出，但服务器使用状态代码进行响应
           //落在2xx的范围之外
           console.log（error.response.data）;
           console.log（error.response.status）;
           console.log（error.response.headers）;
         } else {
           //在设置触发错误的请求时发生了错误
           console.log（'Error'，error.message）;
         }}
         console.log（error.config）;
       }）;
    ```


### 三、axios 实例 请求 API

#### 1. 发送 GET 请求

- 方式一：


    ```
    axios({
      method: 'get',
      url: '/user/12345',
      params: {                 // 注意区别
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });
    ```

- 方式二：

    ```
    axios.get('/user', {        // 注意区别
      params: {
        ID: 12345
      }
    });
    ```


- 方式三：

    ```
    axios.get('/user?ID=12345');
    ```


#### 2. 发送 POST 请求

- **声明：** 默认情况下，axios 将 JavaScript对象 序列化为 JSON

- 方式一：
    
    ```
    axios({
      method: 'post',
      url: '/user/12345',
      data: {                   // 注意区别
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });
    ```

- 方式二：


    ```
    axios.post('/user', {       // 注意区别
      firstName: 'Fred',
      lastName: 'Flintstone'
    });
    
    
    // 添加其他配置项
    axios.post(this.registerUrl, this.newUserInfo, {
      headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    ```

- 注意：
    - axios 提交的POST请求：请求参数不用 `JSON.String()` 转换

    - axios 提交的POST请求：`Content-Type` 默认是 `application/json`
        > 对比：Jquery 提交POST请求：`Content-Type` 默认是 `application/x-www-form-urlencoded`
    

#### 3. 其他请求方法 别名

- 别名如下：
    - `axios.request（config）`

    - `axios.get（url [，config]）`

    - `axios.delete（url [，config]）`

    - `axios.head（url [，config]）`

    - `axios.post（url [，data [，config]]）`

    - `axios.put（url [，data [，config]]）`

    - `axios.patch（url [，data [，config]]）`

- 注意：当使用别名方法时，不需要在config中指定url，method和data属性


### 四、创建 新的 axios实例

#### 1. axios.create( ) 创建新的 Axios 实例

- 通过 `axios.create( )` 可创建一个新的 Axios 实例，继承了 axios 的所有 API


    ```
    var instance = axios.create({
      baseURL: 'https://some-domain.com/api/',
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
    });
    ```

#### 2. 参数将作为 默认配置

- `axios.create( )` 中的参数，将作为 新的 Axios 实例发请求 的默认配置



### 五、配置项：API、默认值、默认值优先级

#### 1. 请求配置 API【重要】

- 如下配置适用于 `axios()` 发请求
    
    ```
    {
      // `url`是将用于请求的服务器URL
      url: '/user',
      // `method`是发出请求时使用的请求方法
      method: 'get', // 默认
      // `baseURL`将被添加到`url`前面，除非`url`是绝对的。
      // 可以方便地为 axios 的实例设置`baseURL`，以便将相对 URL 传递给该实例的方法。
      baseURL: 'https://some-domain.com/api/',
      // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
      // 这只适用于请求方法'PUT'，'POST'和'PATCH'
      // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream
      transformRequest: [function (data) {
        // 做任何你想要的数据转换
        return data;
      }],
      // `transformResponse`允许在 then / catch之前对响应数据进行更改
      transformResponse: [function (data) {
        // Do whatever you want to transform the data
        return data;
      }],
      // `headers`是要发送的自定义 headers
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      // `params`是要与请求一起发送的URL参数
      // 必须是纯对象或URLSearchParams对象
      params: {
        ID: 12345
      },
      // `paramsSerializer`是一个可选的函数，负责序列化`params`
      // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      // `data`是要作为请求主体发送的数据
      // 仅适用于请求方法“PUT”，“POST”和“PATCH”
      // 当没有设置`transformRequest`时，必须是以下类型之一：
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - Browser only: FormData, File, Blob
      // - Node only: Stream
      data: {
        firstName: 'Fred'
      },
      // `timeout`指定请求超时之前的毫秒数。
      // 如果请求的时间超过'timeout'，请求将被中止。
      timeout: 1000,
      // `withCredentials`指示是否跨站点访问控制请求（跨域是否携带 cookie）
      // should be made using credentials
      withCredentials: false, // default
      // `adapter'允许自定义处理请求，这使得测试更容易。
      // 返回一个promise并提供一个有效的响应（参见[response docs]（＃response-api））
      adapter: function (config) {
        /* ... */
      },
      // `auth'表示应该使用 HTTP 基本认证，并提供凭据。
      // 这将设置一个`Authorization'头，覆盖任何现有的`Authorization'自定义头，使用`headers`设置。
      auth: {
        username: 'janedoe',
        password: 's00pers3cret'
      },
      // “responseType”表示服务器将响应的数据类型
      // 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json', // default
      //`xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
      xsrfCookieName: 'XSRF-TOKEN', // default
      // `xsrfHeaderName`是携带xsrf令牌值的http头的名称
      xsrfHeaderName: 'X-XSRF-TOKEN', // default
      // `onUploadProgress`允许处理上传的进度事件
      onUploadProgress: function (progressEvent) {
        // 使用本地 progress 事件做任何你想要做的
      },
      // `onDownloadProgress`允许处理下载的进度事件
      onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
      },
      // `maxContentLength`定义允许的http响应内容的最大大小
      maxContentLength: 2000,
      // `validateStatus`定义是否解析或拒绝给定的promise
      // HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被
      // 拒绝。
      validateStatus: function (status) {
        return status >= 200 && status < 300; // default
      },
      // `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
      // 如果设置为0，则不会遵循重定向。
      maxRedirects: 5, // 默认
      // `httpAgent`和`httpsAgent`用于定义在node.js中分别执行http和https请求时使用的自定义代理。
      // 允许配置类似`keepAlive`的选项，
      // 默认情况下不启用。
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
      // 'proxy'定义代理服务器的主机名和端口
      // `auth`表示HTTP Basic auth应该用于连接到代理，并提供credentials。
      // 这将设置一个`Proxy-Authorization` header，覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
      proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: : {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      // “cancelToken”指定可用于取消请求的取消令牌
      // (see Cancellation section below for details)
      cancelToken: new CancelToken(function (cancel) {
      })
    }
    
    ```

#### 2. 自定义 axios 实例 默认值


```
//在创建实例时设置配置默认值
var instance = axios.create（{
   baseURL：'https://api.example.com'
}）;
```

#### 3. 设置 全局 defaults 默认值


```
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```


#### 4. 配置优先级顺序

- 如下，配置项优先级依次升高，最终 get 请求延迟时间为 5000ms

```
//使用库提供的配置默认值创建实例
var instance = axios.create({
    timeout：1000
});
 
//覆盖库的超时默认值
//现在所有请求将在超时前等待2.5秒
instance.defaults.timeout = 2500;
 
//覆盖此请求的超时，因为它知道需要很长时间
instance.get（'/longRequest'，{
   timeout：5000
}）;
```


### 六、axios 全局拦截器

#### 1. 全局 请求拦截器

- 每一次请求，都会调用 全局请求拦截器，API 如下：

    ```
    axios.interceptors.request.use（function（config）{
         //在发送请求之前做某事
         return config;
       }，function（error）{
         //请求错误时做些事
         return Promise.reject（error）;
       }）;
    ```


#### 2. 全局 响应拦截器

- 每一次响应，都会调用 全局响应拦截器，API 如下：

    ```
    axios.interceptors.response.use（function（response）{
         //对响应数据做些事
          return response;
       }，function（error）{
         //请求错误时做些事
         return Promise.reject（error）;
       }）;
    ```

#### 3. 删除 全局拦截器

- API 如下：

    ```
    var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
    axios.interceptors.request.eject(myInterceptor);
    ```


### 七、axios 处理并发请求


#### 1. axios.all( ) 处理 并发请求

- 限制：并发请求，只要有一个请求出错，将不会走 then 回调，直接走 error 回调

- 参数：
    - 类型：数组

    - 具体项：并行处理的 请求方法

- 响应数据：

    - then 中的参数：由响应体构成的数组

    - catch 中的参数：error 对象


    ```
    $axios.all([triggerHttp1, triggerHttp2]).then((reponse) => {
        console.log(reponse);       // 由响应体构成的数组 [reponse1, reponse2]
    });
    ```


#### 2. axios.spread( ) 将响应数据由 数组 转为 单独项

- API 如下：

    ```
    axios.all([triggerHttp1(), triggerHttp2()])
      .then(axios.spread(function (reponse1, reponse2) {
        // 两个请求现在都执行完成
      }));
    ```


### 八、axios 处理表单请求


#### 1. axios.post 上传文件
- 需要设置请求头为： `multipart/form-data`

    ```
   const formData = new FormData();
    formData.append('name', this.name);
    formData.append('age', this.age);
    formData.append('file', this.file);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    
    axios.post('/upload', formData, config)
      .then(function (res) {
        if (res.status === 2000) {
          /*这里做处理*/
        }
      })
    ```


### 九、基于 axios 封装一个 通用的 ajax请求模块


```
import axios from 'axios'

const fetch = (
    url, 
    params = {},
    options
) => {

    let _options = Object.assign({
        method: 'get',
        withCredentials: true   // 跨域携带 cookie
    }, options)
    
    let [ _params, _data ] = _options.method === 'get' ? [ params, ''] : [ '', params]
    
    return axios({
            method: _options.method,
            url: url,
            params: _params,
            data: _data,
            withCredentials: _options.withCredentials
        })
        .then(res => {
            let _res = res.data
    
            //doSomething
    
            return _res
        })
        .catch(e => {
    
            //doSomething
            //错误上报
    
        })
}

export default fetch
```

