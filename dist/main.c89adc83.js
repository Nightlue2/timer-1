parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
function t(t){throw new Error('"'+t+'" is read-only')}var e,n=document.querySelector(".buttonList"),i=document.querySelector(".show"),s=document.querySelector("#pause"),o=document.querySelector("#play"),l=document.querySelector("#replay"),r=document.querySelector("#stop"),u=new Event("click"),c=[null,null,null,null],a=[null,null,null],d=function(){e=new Date,c=[e.getHours(),e.getMinutes(),e.getSeconds(),e.getTime()]},h=function(t){t?(minutes=Math.floor((t+c[2])/60),a[2]=(t+c[2])%60,hours=Math.floor((minutes+c[1])/60),a[1]=(minutes+c[1])%60,a[0]=hours+c[0]):a=c[1]+40>=60?[c[0]+1,(c[1]+40)%60,c[2]]:[c[0],c[1]+40,c[2]]},m=function(t){return 3600*t[0]+60*t[1]+t[2]},f=function(){if(null!==this.timeoutId)var t="到点了！到点了！起来运动啦！起来运动啦！".split(""),e=0,n=setInterval(function(){return new Promise(function(t){t()}).then(function(){e++,t.push(t.shift()),document.title=t.join(""),80===e&&(clearInterval(n),document.title="计时器")})},70)},v=function(t){["stop","pause"].indexOf(t.id)>=0&&(t.classList.add("selected"),t.classList.remove("normal"))},I=function(){var t=document.querySelector(".selected");t&&(t.classList.remove("selected"),t.classList.add("normal"),t.classList.add("animation-once"),setTimeout(function(){t.classList.remove("animation-once")},3e3))},y={historyTime:null,restSeconds:null,timeoutId:null,intervalId:null,init:function(t){this.clear(),this.refresh(t),this.historyTime=m(c),this.timer()},refresh:function(t){d(),h(t)},clear:function(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null),this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)},pause:function(){this.timeoutId&&(this.clear(),d(),this.restSeconds=2400-(m(c)-this.historyTime))},play:function(){if(this.restSeconds)this.init(this.restSeconds),this.restSeconds=null;else if(this.timeoutId){confirm("当前正在计时，确定要重置吗？")?this.init():console.log()}},stop:function(){this.clear(),this.historyTime=null,this.restSeconds=null,i.textContent="0:40"},timer:function(){var e=this;this.intervalId=setInterval(function(){if(d(),a[0]&&a[1]&&a[2]){var n=m(a)-m(c);if(n){var s=Math.floor(n/60);s<10&&(t("minute"),s="0"+s),i.textContent="0:"+s}else i.textContent="0:00",i.classList.add("strong"),clearInterval(e.intervalId)}},1e3),this.timeoutId=setTimeout(function(){f.call(this),document.title="计时器",setTimeout(function(){l.dispatchEvent(u)},3e3)}.bind(this),1e3*this.restSeconds||24e5)}};n.addEventListener("click",function(t){switch(t.target){case s:y.pause(),I(),v(t.target);break;case o:y.play(),I();break;case r:y.stop(),I(),v(t.target);break;case l:I(),y.init();break;default:console.log()}}),y.init(),i.textContent="0:40";
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.c89adc83.js.map