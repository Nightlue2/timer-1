const buttonlist = document.querySelector(".buttonList");
const show = document.querySelector(".show");
const pause = document.querySelector("#pause");
const play = document.querySelector("#play");
const replay = document.querySelector("#replay");
const stop = document.querySelector("#stop");
let triggerButton = document.createEvent("HTMLEvents");
triggerButton.initEvent("click", false, false);
let showTime = [0, 0, 0];
const goalTime = [0, 10, 0];

const changeTitle = function() {
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
    const intervalId = setInterval(tempF, 30);
};
const addClass = function(target) {
    const selectButton = ["stop", "pause"];
    if (selectButton.indexOf(target.id) >= 0) {
        target.classList.add("selected");
        target.classList.remove("normal");
    }
};
const removeClass = function(x) {
    const target = document.querySelector(".selected");
    if (target && target.id !== x) {
        target.classList.remove("selected");
        target.classList.add("normal");
        target.classList.add("animation-once");
        setTimeout(() => {
            target.classList.remove("animation-once");
        }, 3000);
    }
};
const timeObj = {
    intervalId: null,
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
        } else if (
            showTime[0] === 0 &&
            showTime[1] === 0 &&
            showTime[2] === 0
        ) {
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
            function() {
                if (
                    showTime[0] === showTime[1] &&
                    showTime[1] === showTime[2] &&
                    showTime[2] === 0
                ) {
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
            }.bind(this),
            1000
        );
        return this.intervalId;
    }
};
buttonlist.addEventListener("click", function(e) {
    switch (e.target) {
        case pause:
            timeObj.clear();
            removeClass("pause");
            addClass(e.target);
            break;
        case play:
            timeObj.play();
            removeClass();
            break;
        case stop:
            timeObj.stop();
            removeClass("stop");
            addClass(e.target);
            break;
        default:
            console.log();
    }
});
replay.onclick = function() {
    setTimeout(() => {
        removeClass();
        timeObj.stop();
        timeObj.init();
    }, 1000);
};
Object.freeze(goalTime);
timeObj.init();
