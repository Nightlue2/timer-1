parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
var t=document.querySelector(".buttonList"),e=document.querySelector(".show"),n=document.querySelector("#pause"),i=document.querySelector("#play"),r=document.querySelector("#replay"),s=document.querySelector("#stop"),c=document.createEvent("HTMLEvents");c.initEvent("click",!1,!1);var o=[0,0,0],a=[0,10,0],l=function(){var t="到点了！到点了！起来运动啦！起来运动啦！".split(""),e=0,n=setInterval(function(){return new Promise(function(t){t()}).then(function(){e++,t.push(t.shift()),document.title=t.join(""),80===e&&(clearInterval(n),document.title="计时器")})},30)},u=function(t){["stop","pause"].indexOf(t.id)>=0&&(t.classList.add("selected"),t.classList.remove("normal"))},d=function(t){var e=document.querySelector(".selected");e&&e.id!==t&&(e.classList.remove("selected"),e.classList.add("normal"),e.classList.add("animation-once"),setTimeout(function(){e.classList.remove("animation-once")},3e3))},m={intervalId:null,init:function(){this.clear();for(var t=0;t<3;t++)o[t]=a[t];this.render(),this.timer()},clear:function(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)},play:function(){this.intervalId?(this.clear(),confirm("当前正在计时，确定要重置吗？")?this.init():this.render()&&this.timer()):0===o[0]&&0===o[1]&&0===o[2]||this.timer()},stop:function(){this.clear();for(var t=0;t<3;t++)o[t]=a[t];this.render()},render:function(){var t,n,i;!(0===o[0]&&o[1]<10)&&document.querySelector(".strong")&&document.querySelector(".strong").classList.remove("strong"),i=o[2]<10?"0"+o[2]:""+o[2],o[1]<10?(o[0]<10&&o[0]>0?t="0"+o[0]:0===o[0]?(t="0"+o[0],e.classList.add("strong")):t=""+o[0],n="0"+o[1]):(t=o[0]<10?"0"+o[0]:""+o[0],n=""+o[1]),e.textContent=t+":"+n+":"+i},timer:function(){this.intervalId=setInterval(function(){o[0]===o[1]&&o[1]===o[2]&&0===o[2]?(this.render(),l.call(this),document.title="计时器",r.dispatchEvent(c),clearInterval(this.intervalId)):(-1==--o[2]&&(-1==--o[1]?-1==--o[0]?(o[0]++,o[1]++):o[1]+=60:o[2]+=60),this.render())}.bind(this),1e3)}};t.addEventListener("click",function(t){switch(t.target){case n:m.clear(),d("pause"),u(t.target);break;case i:m.play(),d();break;case s:m.stop(),d("stop"),u(t.target);break;default:console.log()}}),r.onclick=function(){setTimeout(function(){d(),m.stop(),m.init()},1e3)},Object.freeze(a),m.init();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9cf4dea3.js.map