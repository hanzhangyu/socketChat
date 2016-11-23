/**
 * Created by Paul on 2016/11/22.
 */
//var S=function (ele){
//  return document.querySelectorAll(ele)[1]?document.querySelectorAll(ele):document.querySelectorAll(ele)[0]
//};
//S.prototype.addClass=function(ele,className){
//    if (ele.classList)
//        ele.classList.add(className);
//    else
//        ele.className += ' ' + className;
//};
//function ready(fn) {
//    if (document.readyState != 'loading'){
//        fn();
//    } else {
//        document.addEventListener('DOMContentLoaded', fn);
//    }
//}
//(function(){…})(); 与 (function(){…}())一样可以使用SAT（抽象语法树分析）一模一样
(function(global,factory){
    //jsAMD化，是的webpack等可以调用
    if (typeof define === 'function' && define.amd)
        define(function() { return factory(global) })
    else
        factory(global)
}(this,function(window){
    var Joke=(function(){
        var J,
            isHtml=/^\s*<(\w+|!)[^>]*>/,
            joke={};

        function isString(value){return typeof value =='string'}
        function isFunction(value){return Object.prototype.toString.call(value) === "[object Function]"}

        function vDom(dom,selector){
            var i,l=dom?dom.length:0;
            for(i=0;i<l;i++)this[i]=dom[i]
            this.length=l;
            this.selector=selector || ''
        }

        J=function(selector,context){
            return joke.init(selector,context)
        }

        joke.vDom=function(dom,selector){
            return new vDom(dom,selector)
        }

        joke.init=function(selector,context){
            var dom;
            if(!selector)return []
            else if(isString(selector)){
                selector=selector.trim();
                if(selector[0]=='<'&&isHtml.test(selector))
                    console.log('传过来了一个node对象，方法待补充')
                else if(context!==undefined){
                    console.log('子集筛选待补充')
                    return J(selector)
                }
                else dom = joke.selectEle(selector)
            } else if(isFunction(selector))return J(document).ready(selector)
            console.log(joke.vDom(dom,selector))
            return joke.vDom(dom,selector);
        }

        joke.selectEle=function(selector){
            return document.querySelectorAll(selector)[1]?document.querySelectorAll(selector):document.querySelectorAll(selector)[0]
        }

        J.fn={
            ready:function(callback){(document.readyState != 'loading')?callback():document.addEventListener('DOMContentLoaded', callback);return this;}
        }

        J.isFunction=isFunction
        J.isString=isString

        joke.vDom.prototype=vDom.prototype= J.fn;
        J.joke=joke;

        return J;
    })()

    window.Joke=Joke;
    window.J===undefined&&(window.J=Joke)
}))

