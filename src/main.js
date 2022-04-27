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

let sessionTime = {
    minutes: 0,
    seconds: 0,
    name: 'Session time',
    display: sessionTimeDisplay
}

const breakTime = {
    minutes: 0,
    seconds: 0,
    name: 'Break time',
    display: breakTimeDisplay
}

const timers = [timer, sessionTimeDisplay, breakTimeDisplay];



// function onLoad(sessionName) {
//     if (sessionName === 'Session time') {
//         timer.innerHTML = `${timeLength(JSON.parse(localStorage.getItem('Session time')).minutes)}:${timeLength(JSON.parse(localStorage.getItem('Session time')).seconds)}`;
//         sessionTime.display.innerHTML = `${timeLength(sessionTime.minutes)}:${timeLength(sessionTime.seconds)}`;
//     } else if (sessionName === 'Break time') {
//         timer.innerHTML = `${timeLength(breakTime.minutes)}:${timeLength(breakTime.seconds)}`;
//         sessionTime.display.innerHTML = `${timeLength(breakTime.minutes)}:${timeLength(breakTime.seconds)}`;
//     } else {
//         timer.innerHTML = `00:00`;
//         sessionTime.display.innerHTML = `00:00`;
//     }
// }
//
// window.onload = function () {
//     onLoad(JSON.parse(localStorage.getItem('lastName')));
// }

// timer.innerHTML = JSON.parse(localStorage.getItem(session.name)) || '00:00'

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

start.addEventListener('click', () => {

    if (start.innerHTML === 'Start') {
        startCountdown(sessionTime);
        timeout = setTimeout(function () {
            startCountdown(breakTime);
            timerName.innerHTML = breakTime.name;
            timer.innerHTML = sessionLength(breakTime);
        }, parseInt(sessionTime.seconds) * 1000 + 2000);
        start.innerHTML = 'Stop';
    } else {
        clearInterval(interval);
        clearTimeout(timeout);
        start.innerHTML = 'Start';
    }
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
})

function changeTime(session, operation) {
    timerName.innerHTML = session.name;
    session.display.innerHTML = `${timeLength(session.minutes)}:${timeLength(session.seconds + 1)}`;
    // sessionLength(session);
    if (operation === '+') {
        session.seconds += 1;
        if (session.seconds > 59) {
            session.seconds = 0;
            session.minutes += 1;
        }
    } else {
        session.seconds -= 1;
        session.display.innerHTML = sessionLength(session);
        if (session.minutes > 0 && session.seconds < 0) {
            session.minutes -= 1;
            session.seconds = 59;
        } else if (session.minutes === 0 && session.seconds < 1) {
            session.seconds = 0;
            session.display.innerHTML = sessionLength(session);
        }
    }

    timer.innerHTML = sessionLength(session);

    // let lastName = session.name;
    //
    // localStorage.setItem('lastName', session.name);
    //
    // localStorage.setItem(`${session.name}`, JSON.stringify(session));

    // if (session.name === 'Session time') {
    //     localStorage.setItem('Session time', JSON.stringify(sessionTime));
    // } else {
    //     localStorage.setItem('Break time', JSON.stringify(breakTime));
    // }
}

let interval = null;
let timeout = null;


function startCountdown(session) {

    interval = setInterval(() => {
        if (session.seconds > 0) {
            session.seconds--;
            timerName.innerHTML = session.name;
        } else if (session.minutes > 0 && session.seconds <= 0) {
            session.minutes--;
            session.seconds = 59;
        } else if (session.minutes === 0 && session.seconds < 1) {
            session.seconds = 0;
            audio.play();
            timer.innerHTML = '00:00';
            session.display.innerHTML = '00:00';
            clearInterval(interval);
        }
        timer.innerHTML = sessionLength(session);
        session.display.innerHTML = sessionLength(session);

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

