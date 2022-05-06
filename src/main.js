const start = document.querySelector('.btn-start');
const reset = document.querySelector('.btn-reset');
const addSessionTimeBtn = document.querySelector('.session-inc-btn');
const reduceSessionTimeBtn = document.querySelector('.session-dec-btn');
const addBreakTimeBtn = document.querySelector('.break-inc-btn');
const reduceBreakTimeBtn = document.querySelector('.break-dec-btn');
const sessionTimeDisplay = document.querySelector('.session-time-display')
const breakTimeDisplay = document.querySelector('.break-time-display');
let timerName = document.querySelector('.timer-name');
let timer = document.querySelector('.timer');
const audio = document.querySelector('audio');
let interval = null;
let timeout = null;
let sessionTime;
let breakTime;

const timers = [timer, sessionTimeDisplay, breakTimeDisplay];


window.onload = function () {
    sessionTime = JSON.parse(localStorage.getItem('Session time')) || {
        minutes: 0,
        seconds: 0,
        name: 'Session time',
        display: sessionTimeDisplay
    }

    breakTime = JSON.parse(localStorage.getItem('Break time')) || {
        minutes: 0,
        seconds: 0,
        name: 'Break time',
        display: breakTimeDisplay
    }

    sessionTimeDisplay.innerHTML = sessionLength(sessionTime);
    breakTimeDisplay.innerHTML = sessionLength(breakTime);

    if (localStorage.getItem('lastName') === 'Session time') {
        timer.innerHTML = sessionLength(sessionTime);
        timerName.innerHTML = sessionTime.name
    } else if (localStorage.getItem('lastName') === 'Break time') {
        timer.innerHTML = sessionLength(breakTime);
        timerName.innerHTML = breakTime.name;
    } else {
        timerName.innerHTML = 'Session time'
    }
}

addSessionTimeBtn.addEventListener('click', function () {
    changeTime(sessionTime, '+');
})

reduceSessionTimeBtn.addEventListener('click', function () {
    changeTime(sessionTime, '-');
})

addBreakTimeBtn.addEventListener('click', function () {
    changeTime(breakTime, '+');
})

reduceBreakTimeBtn.addEventListener('click', function () {
    changeTime(breakTime, '-');
})



function startFunc() {
    if (start.innerHTML === 'Start') {
        startCountdown(sessionTime);
        timeout = setTimeout(function () {
            startCountdown(breakTime);
            timerName.innerHTML = breakTime.name;
            timer.innerHTML = sessionLength(breakTime);
        }, (sessionTime.minutes * 60 + parseInt(sessionTime.seconds) + 1) * 1000);
        start.innerHTML = 'Stop';
    } else {
        clearInterval(interval);
        clearTimeout(timeout);
        start.innerHTML = 'Start';
    }
}




start.addEventListener('click', () => {
    startFunc();
})

reset.addEventListener('click', () => {
    sessionTime.minutes = 0;
    sessionTime.seconds = 0;
    breakTime.minutes = 0;
    breakTime.seconds = 0;
    timerName.innerHTML = 'Session time';
    timers.forEach((el) => {
        el.innerHTML = sessionLength(sessionTime);
    })
    start.innerHTML = 'Start';
    audio.load();
    audio.pause();
    clearInterval(interval);
    clearTimeout(timeout);
    localStorage.clear();
})

function changeTime(session, operation) {
    timerName.innerHTML = session.name;
    // sessionTimeDisplay.innerHTML = `kk + ${sessionTime.minutes}`
    if (operation === '+') {
        session.minutes += 1;
        if (session.seconds > 59) {
            session.seconds = 0;
            session.minutes += 1;
        }
    } else {
        // session.minutes -= 1;
        // session.display.innerHTML = sessionLength(session);
        if (session.minutes > 0 && session.seconds < 0) {
            session.minutes -= 1;
            session.seconds = 59;
        } else if (session.minutes === 0 && session.seconds < 1) {
            session.minutes = 0;
            session.seconds = 0;
            // session.display.innerHTML = sessionLength(session);
        } else {
            session.minutes -= 1;
            // session.display.innerHTML = sessionLength(session);
        }
    }


    if (session.name === 'Session time') {
        sessionTimeDisplay.innerHTML = `${timeLength(session.minutes)}:${timeLength(session.seconds)}`
    } else {
        breakTimeDisplay.innerHTML = sessionLength(breakTime);
    }

    timer.innerHTML = sessionLength(session);

    console.log(session.minutes);
    console.log(session.display.innerHTML);

    localStorage.setItem('lastName', session.name);
    updateStorage();
}

function updateStorage() {
    localStorage.setItem('Session time', JSON.stringify(sessionTime));
    localStorage.setItem('Break time', JSON.stringify(breakTime));
}

function startCountdown(session) {

    interval = setInterval(() => {
        if (session.seconds > 0) {
            session.seconds--;
            timerName.innerHTML = session.name;
            // console.log(document.visibilityState)
        } else if (session.minutes > 0 && session.seconds <= 0) {
            session.minutes--;
            session.seconds = 59;
        } else if (session.minutes === 0 && session.seconds < 1) {
            session.seconds = 0;
            audio.play();
            clearInterval(interval);
        }

        timer.innerHTML = sessionLength(session);
        if (session.name === 'Session time') {
            sessionTimeDisplay.innerHTML = `${timeLength(session.minutes)}:${timeLength(session.seconds)}`
        } else {
            breakTimeDisplay.innerHTML = sessionLength(breakTime);
        }
        updateStorage();
    }, 1000);

    // if (start.innerHTML === 'Stop') {
    //     clearInterval(interval)
    // }
}

function timeLength(time) {
    return time.toString().length < 2 ? `0${time}` : time
}

function sessionLength(session) {
    return `${timeLength(session.minutes)}:${timeLength(session.seconds)}`;
}






// const colors = ['black', '#73b0f5', '#4287f5', '#f03b0a', '#39cc3e']
//
// const themes = [dark, light, ocean, fire, forest];
//
// for (let i = 0; i < themes.length; i++) {
//     themes[i].addEventListener('click', () => {
//         document.body.style.backgroundColor = colors[i];
//         themes[i].style.backgroundColor = colors[i];
//
//     })
// }


const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const ocean = document.querySelector('.ocean');
const fire = document.querySelector('.fire');
const forest = document.querySelector('.forest');

light.addEventListener('click', () => {
    document.body.style.backgroundColor = '#73b0f5';
    light.style.backgroundColor = '#73b0f5';
    dark.style.backgroundColor = '#73b0f5';
})

dark.addEventListener('click', () => {
    document.body.style.backgroundColor = 'black';
    light.style.backgroundColor = 'black';
    dark.style.backgroundColor = 'black';
})

// function createTemplate() {
//     return `<div>
//                 <button>Test button</button>
//             </div>`
// }

// if (document.visibilityState === 'hidden') {
//     this.window.createTemplate();
// }


// document.addEventListener('visibilitychange', () => {
//     if (document.visibilityState === 'hidden') {
//         alert('alert!!!')
//         timerName.innerHTML = 'hh'
//         console.log(document.visibilityState)
//         let iframe = document.createElement('iframe');
//         iframe.style.width = '200px';
//         iframe.style.height = '200px';
//         iframe.style.border = 'red solid 5px';
//
//
//         document.body.appendChild(iframe);
//     }
// })
//
// if (document.visibilityState === 'hidden') {
//     timerName.innerHTML = 'hh'
//     console.log(document.visibilityState)
//     let iframe = document.createElement('iframe');
//     iframe.style.width = '200px';
//     iframe.style.height = '200px';
//     iframe.style.border = 'red solid 5px';
//     document.appendChild(iframe)
//     // document.body.appendChild(iframe);
// }