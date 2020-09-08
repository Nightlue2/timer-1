const buttonlist = document.querySelector(".buttonList");
const show = document.querySelector(".show");
const pause = document.querySelector("#pause");
const play = document.querySelector("#play");
const replay = document.querySelector("#replay");
const stop = document.querySelector("#stop");
const triggerButton = new Event("click");

let date; //date不能为常量
let currentTime = [null, null, null, null];
let endTime = [null, null, null];
const getCurrentTime = () => {
    date = new Date();
    currentTime = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getTime()
    ];
};
const getEndTime = () => {
    if (currentTime[1] + 40 >= 60) {
        endTime = [
            currentTime[0] + 1,
            (currentTime[1] + 40) % 60,
            currentTime[2]
        ];
    } else {
        endTime = [currentTime[0], currentTime[1] + 40, currentTime[2]];
    }
};
const calcSeconds = x => {
    //转换成秒
    return x[0] * 3600 + x[1] * 60 + x[2];
};
const changeTitle = function() {
    if (this.timeoutId === null) return;
    const keywords = "到点了！到点了！起来运动啦！起来运动啦！";
    let keyArray = keywords.split("");
    let tick = 0;
    const tempF = function() {
        return new Promise(resolve => {
            resolve();
        }).then(() => {
            tick++;
            keyArray.push(keyArray.shift());
            document.title = keyArray.join("");
            if (tick === 80) {
                clearInterval(intervalId);
                document.title = "计时器";
            }
        });
    };
    const intervalId = setInterval(tempF, 70);
};
const addClass = function(target) {
    const selectButton = ["stop", "pause"];
    if (selectButton.indexOf(target.id) >= 0) {
        target.classList.add("selected");
        target.classList.remove("normal");
    }
};
const removeClass = function() {
    const target = document.querySelector(".selected");
    if (target) {
        target.classList.remove("selected");
        target.classList.add("normal");
        target.classList.add("animation-once");
        setTimeout(() => {
            target.classList.remove("animation-once");
        }, 3000);
    }
};
const timeObj = {
    historyTime: null,
    restSeconds: null,
    timeoutId: null,
    intervalId: null,
    init() {
        this.clear();
        this.refresh();
        this.historyTime = calcSeconds(currentTime);
        this.timer();
    },
    refresh() {
        getCurrentTime();
        getEndTime();
    },
    clear() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },
    pause() {
        if (this.timeoutId) {
            this.clear();
            this.refresh();
            this.restSeconds =
                40 * 60 - (calcSeconds(currentTime) - this.historyTime);
        }
    },
    play() {
        if (this.restSeconds) {
            this.historyTime = null;
            this.init();
            this.restSeconds = null;
        } else if (this.timeoutId) {
            const answer = confirm("当前正在计时，确定要重置吗？");
            if (answer) {
                this.clear();
                this.restSeconds = null;
                this.init();
            }
        } else {
            this.init();
        }
    },
    stop() {
        this.clear();
        this.historyTime = null;
        this.restSeconds = null;
        show.textContent = "0:" + 40;
    },
    timer() {
        this.intervalId = setInterval(() => {
            getCurrentTime();
            if (endTime[0] && endTime[1] && endTime[2]) {
                let diff = calcTime(endTime) - calcTime(currentTime);
                if (diff) {
                    const minute = Math.floor(diff / 60);
                    if (minute < 10) minute = "0" + minute;
                    show.textContent = "0:" + minute;
                } else {
                    show.textContent = "0:00";
                    show.classList.add("strong");
                    clearInterval(this.intervalId);
                }
            }
        }, 60000);
        this.timeoutId = setTimeout(
            function() {
                changeTitle.call(this);
                document.title = "计时器";
                setTimeout(() => {
                    replay.dispatchEvent(triggerButton);
                }, 3000);
            }.bind(this),
            this.restSeconds * 1000 || 40 * 60 * 1000
        );
    }
};
buttonlist.addEventListener("click", e => {
    switch (e.target) {
        case pause:
            timeObj.pause();
            removeClass();
            addClass(e.target);
            break;
        case play:
            timeObj.play();
            removeClass();
            break;
        case stop:
            timeObj.stop();
            removeClass();
            addClass(e.target);
            break;
        case replay:
            removeClass();
            timeObj.init();
            break;
        default:
            console.log();
    }
});
timeObj.init();
show.textContent = "0:" + 40;
