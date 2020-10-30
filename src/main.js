const buttonList = document.querySelector(".buttonList");
const show = document.querySelector(".show");
const diyTime = document.querySelector(".setTime");
const submit = document.querySelector(".submit");
const pause = document.querySelector("#pause");
const play = document.querySelector("#play");
const replay = document.querySelector("#replay");
const stopButton = document.querySelector("#stop");
const iconWrapper = document.querySelector(".iconWrapper");
const inputWrapper = document.querySelector('.inputWrapper');
let triggerButton = document.createEvent("HTMLEvents");

triggerButton.initEvent("click", false, false);
const operation = { pause: pause, play: play, stopButton: stopButton }; //绑定事件的对象
let showTime = [0, 0, 0];
let goalTime = JSON.parse(localStorage.getItem('time') || '[0,40,0]');

const changeTitle = function () {
  let keyArray = "到点了！到点了！起来运动啦！起来运动啦！".split("");
  let tick = 0;
  const tempFunc = function () {
    tick++;
    keyArray.push(keyArray.shift());
    document.title = keyArray.join("");
    if (tick === 80) {
      clearInterval(intervalId);
      document.title = "Timer-计时器";
    }
  };
  const intervalId = setInterval(tempFunc, 30);
};
const addClass = function () {
  this.classList.add("selected");
  this.classList.remove("normal");
};
const removeClass = function (x) {
  //删除除了x的selected元素
  const target = document.querySelector(".selected");
  if (target && target.id !== x) {
    target.classList.remove("selected");
    target.classList.add("normal");
    target.classList.add("animation-once");
    setTimeout(() => {
      target.classList.remove("animation-once");
    }, 500);
  }
};
const addEvent = function (button, func) {
  button.addEventListener("click", function (e) {
    func(e);
  });
};
const timeObj = {
  intervalId: null,
  dataOperation: {
    pause(e) {
      timeObj.clear();
      removeClass("pause");
      addClass.call(pause);
    },
    play(e) {
      timeObj.play();
      removeClass();
    },
    stopButton(e) {
      timeObj.stop();
      removeClass("stop");
      addClass.call(stopButton);
    },
  },
  init() {
    this.clear();
    for (let i = 0; i < 3; i++) {
      showTime[i] = goalTime[i];
    }
    this.render();
    this.timer();
    return 1;
  },
  clear() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
  play() {
    if (this.intervalId) {
      this.clear();
      const answer = confirm("当前正在计时，确定要重置吗？");
      answer ? this.init() : this.render() && this.timer();
    } else {
      this.timer();
    }
  },
  stop() {
    this.clear();
    for (let i = 0; i < 3; i++) {
      showTime[i] = goalTime[i];
    }
    this.render();
  },
  render() {
    let hour, minute, second;
    !(showTime[0] === 0 && showTime[1] < 10) &&
      document.querySelector(".strong") &&
      document.querySelector(".strong").classList.remove("strong");
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
  timer() {
    this.intervalId = setInterval(
      function () {
        if (
          showTime[0] === showTime[1] &&
          showTime[1] === showTime[2] &&
          showTime[2] === 0
        ) {
          this.render();
          changeTitle.call(this);
          replay.dispatchEvent(triggerButton);
          this.clear();
        } else {
          if (--showTime[2] === -1) { //只需要解决两种借位情况
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
      }.bind(this),
      1000
    );
  },
};
addEvent(submit, function (e) {
  const arr = diyTime.value.split(":");
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
})
for (item in operation) {
  addEvent(operation[item], timeObj.dataOperation[item]);
}
replay.onclick = function () {
  setTimeout(() => {
    removeClass();
    timeObj.stop();
    timeObj.init();
  }, 2500);
};
timeObj.init();
