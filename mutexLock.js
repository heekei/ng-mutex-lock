/*
 * @Author: zhuang.xiqi 
 * @Date: 2017-07-24 17:26:12 
 * @Last Modified by: zhuang.xiqi
 * @Last Modified time: 2017-08-04 11:50:08
 */
/**
 * [mutexLockService] 互斥锁服务
 */
'use strict';
angular.module('mutexLockServiceModule', []).
    factory('mutexLockService', ['$q', '$window', function ($q, $window) {
        var queue = []; //互斥队列
        return {
            /**
             * [create] 为具名函数函数创建互斥锁
             * 
             * @param {function} fn 返回值为Promise的具名函数函数
             * @param {any} params 参数
             * @returns {function} 封装了互斥锁的函数
             */
            create: function (fn, params) {
                return function () {
                    if (queue.indexOf(fn.name) > -1) return;// console.log("互斥锁已存在");
                    queue.push(fn.name);//加入互斥队列
                    fn(params).finally(function () {
                        queue.splice(queue.indexOf(fn.name));//从互斥队列移除
                    });
                };
            },
            /**
             * [remove] 从互斥队列中移除函数
             * 
             * @param {function} fn 具名函数
             * @returns {boolean} 移除是否成功
             */
            remove: function (fn) {
                var i = queue.indexOf(fn.name);
                if (i > -1) {//存在与互斥队列中
                    queue.splice(i, 1);
                    return true;
                }
                return false;
            },
            /**
             * [queryLock] 查询函数是否被锁
             * 
             * @param {function} fn 具名函数函数 
             * @returns 
             */
            queryLock: function (fn) {
                return queue.indexOf(fn.name) > -1;
            }
        };
    }]);