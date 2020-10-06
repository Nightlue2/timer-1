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
})({"main.js":[function(require,module,exports) {
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
var goalTime = JSON.parse(localStorage.getItem('time') || '[0,40,0]') || [0, 40, 0];

var changeTitle = function changeTitle() {
  var keyArray = "到点了！到点了！起来运动啦！起来运动啦！".split("");
  var tick = 0;

  var tempFunc = function tempFunc() {
    return new Promise(function (resolve) {
      resolve();
    }).then(function () {
      tick++;
      keyArray.push(keyArray.shift());
      document.title = keyArray.join("");

      if (tick === 80) {
        clearInterval(intervalId);
        document.title = "计时器";
      }
    });
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
    } else if (showTime[0] === 0 && showTime[1] === 0 && showTime[2] === 0) {} else {
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
        document.title = "计时器";
        replay.dispatchEvent(triggerButton);
        clearInterval(this.intervalId);
      } else {
        if (--showTime[2] === -1) {
          if (--showTime[1] === -1) {
            if (--showTime[0] === -1) {
              showTime[0]++;
              showTime[1]++;
            } else {
              showTime[1] += 60;
            }
          } else {
            showTime[2] += 60;
          }
        }

        this.render();
      }
    }.bind(this), 1000);
    return this.intervalId;
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
  }, 1000);
};

timeObj.init();
},{}],"../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49196" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map