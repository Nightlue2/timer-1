// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var buttonList = document.querySelector(".buttonList");
var show = document.querySelector(".show");
var diyTime = document.querySelector(".setTime");
var submit = document.querySelector(".submit");

var _pause = document.querySelector("#pause");

var play = document.querySelector("#play");
var replay = document.querySelector("#replay");

var _stopButton = document.querySelector("#stop");

var iconWrapper = document.querySelector(".iconWrapper");
var inputWrapper = document.querySelector('.inputWrapper');
var triggerButton = document.createEvent("HTMLEvents");
triggerButton.initEvent("click", false, false);
var operation = {
  pause: _pause,
  play: play,
  stopButton: _stopButton
}; //绑定事件的对象

var showTime = [0, 0, 0];
var goalTime = JSON.parse(localStorage.getItem('time') || '[0,40,0]');

var changeTitle = function changeTitle() {
  var keyArray = "到点了！到点了！起来运动啦！起来运动啦！".split("");
  var tick = 0;

  var tempFunc = function tempFunc() {
    tick++;
    keyArray.push(keyArray.shift());
    document.title = keyArray.join("");

    if (tick === 80) {
      clearInterval(intervalId);
      document.title = "Timer-计时器";
    }
  };

  var intervalId = setInterval(tempFunc, 30);
};

var addClass = function addClass() {
  this.classList.add("selected");
  this.classList.remove("normal");
};

var removeClass = function removeClass(x) {
  //删除除了x的selected元素
  var target = document.querySelector(".selected");

  if (target && target.id !== x) {
    target.classList.remove("selected");
    target.classList.add("normal");
    target.classList.add("animation-once");
    setTimeout(function () {
      target.classList.remove("animation-once");
    }, 500);
  }
};

var addEvent = function addEvent(button, func) {
  button.addEventListener("click", function (e) {
    func(e);
  });
};

var timeObj = {
  intervalId: null,
  dataOperation: {
    pause: function pause(e) {
      timeObj.clear();
      removeClass("pause");
      addClass.call(_pause);
    },
    play: function play(e) {
      timeObj.play();
      removeClass();
    },
    stopButton: function stopButton(e) {
      timeObj.stop();
      removeClass("stop");
      addClass.call(_stopButton);
    }
  },
  init: function init() {
    this.clear();

    for (var i = 0; i < 3; i++) {
      showTime[i] = goalTime[i];
    }

    this.render();
    this.timer();
    return 1;
  },
  clear: function clear() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
  play: function play() {
    if (this.intervalId) {
      this.clear();
      var answer = confirm("当前正在计时，确定要重置吗？");
      answer ? this.init() : this.render() && this.timer();
    } else {
      this.timer();
    }
  },
  stop: function stop() {
    this.clear();

    for (var i = 0; i < 3; i++) {
      showTime[i] = goalTime[i];
    }

    this.render();
  },
  render: function render() {
    var hour, minute, second;
    !(showTime[0] === 0 && showTime[1] < 10) && document.querySelector(".strong") && document.querySelector(".strong").classList.remove("strong");

    if (showTime[2] < 10) {
      second = "0" + showTime[2];
    } else {
      second = "" + showTime[2];
    }

    if (showTime[1] < 10) {
      if (showTime[0] < 10 && showTime[0] > 0) {
        hour = "0" + showTime[0];
      } else if (showTime[0] === 0) {
        hour = "0" + showTime[0];
        show.classList.add("strong");
      } else {
        hour = "" + showTime[0];
      }

      minute = "0" + showTime[1];
    } else {
      if (showTime[0] < 10) {
        hour = "0" + showTime[0];
      } else {
        hour = "" + showTime[0];
      }

      minute = "" + showTime[1];
    }

    show.textContent = hour + ":" + minute + ":" + second;
    return 1;
  },
  timer: function timer() {
    this.intervalId = setInterval(function () {
      if (showTime[0] === showTime[1] && showTime[1] === showTime[2] && showTime[2] === 0) {
        this.render();
        changeTitle.call(this);
        replay.dispatchEvent(triggerButton);
        this.clear();
      } else {
        if (--showTime[2] === -1) {
          //只需要解决两种借位情况
          if (--showTime[1] === -1) {
            if (--showTime[0] !== -1) {
              showTime[1] += 60;
              showTime[2] += 60;
            }
          } else {
            showTime[2] += 60;
          }
        }

        this.render();
      }
    }.bind(this), 1000);
  }
};
addEvent(submit, function (e) {
  var arr = diyTime.value.split(":");
  goalTime[0] = parseInt(arr[0]);
  goalTime[1] = parseInt(arr[1]);

  if (goalTime[0] === 0 && goalTime[1] === 0) {
    return;
  }

  localStorage.setItem('time', JSON.stringify(goalTime));
  removeClass();
  timeObj.init();
});
addEvent(iconWrapper, function () {
  inputWrapper.classList.toggle('showOff');
});

for (item in operation) {
  addEvent(operation[item], timeObj.dataOperation[item]);
}

replay.onclick = function () {
  setTimeout(function () {
    removeClass();
    timeObj.stop();
    timeObj.init();
  }, 2500);
};

timeObj.init();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.fa1774db.js.map