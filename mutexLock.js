/*
 * @Author: zhuang.xiqi 
 * @Date: 2017-07-24 17:26:12 
 * @Last Modified by: zhuang.xiqi
 * @Last Modified time: 2017-09-19 10:37:53
 */
/**
 * [mutexLockService] 互斥锁服务
 */
angular.module('mutexLockServiceModule', []).
    factory('mutexLockService', ['$q', '$window', function ($q, $window) {
        var queue = []; //互斥队列
        /**
         * 从互斥队列移除
         * 
         * @param {function|string} fn 具名函数或函数名
         */
        function removeLock(fn) {
            var fnName = typeof fn === 'function' ? fn.name : fn;
            queue.splice(queue.indexOf(fnName));
        }
        return {
            /**
             * [create] 为具名函数创建互斥锁
             * 
             * @param {function} fn 返回值为Promise的具名函数
             * @param {any} params 参数
             * @returns {function} 封装了互斥锁的函数
             */
            create: function (fn, params) {
                return function () {
                    if (queue.indexOf(fn.name) > -1) return;
                    queue.push(fn.name);
                    fn(params).finally(function () { removeLock(fn); });
                };
            },
            /**
             * [queryLock] 查询函数是否被锁
             * 
             * @param {function|string} fn 具名函数或函数名
             * @returns 
             */
            queryLock: function (fn) {
                var fnName = typeof fn === 'function' ? fn.name : fn;
                return queue.indexOf(fnName) > -1;
            }
        };
    }]);
