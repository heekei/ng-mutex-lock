# 源自
>由于对项目中所有的ajax请求进行了错误拦截，并弹出错误信息，导致了当服务器宕机时，会有无数个错误弹窗爆发出来，因此就想起互斥线程这个东西，于是做了个ng版的“互斥锁”。

# 模块名 `mutexLockServiceModule`

# 服务名 `mutexLockService`

# Demo

```js
//首先将你的函数改造成返回值为Promise的异步函数。
//例如，你的函数是hello
function hello(){
    console.log("hallo world!");
};

//改造成异步函数
var fn = function(){
    var defer = $q.defer();
    console.log("hallo world!");//hello函数的内容
    defer.resolve();
    return defer.promise;
};

//将fn加上互斥锁
var lockedHello = mutexLockService.create(fn);

//然后……
//没有了
```

# 详情
>还提供了remove和query方法，用来删除和查询互斥锁

>请移步代码，简短寥寥几行
