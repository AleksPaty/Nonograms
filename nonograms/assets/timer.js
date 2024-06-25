const getTimer = (timerElem, expr, v) => {
    let min = 0;
    let sec = 0;
    let showSec = '00';
    let showMin = '00';
    let curTimer;

    function tt() {
        sec++;
        if (sec === 60) {
            sec -= 60;
            min++;
        }

        showSec = sec < 10 ? `0${sec}` : `${sec}`;
        showMin = min < 10 ? `0${min}` : `${min}`

        timerElem.innerText = `${showMin}:${showSec}`;
        
        curTimer = setTimeout(tt, 1000)
        timerElem.dataset.timeId = curTimer;
    }

    if (!expr) tt()
}

export default getTimer