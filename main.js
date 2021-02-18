var start = document.getElementById('start');
var reset = document.getElementById('reset');
var pause = document.getElementById('pause');
var startInfo = document.getElementById('startInfo');
var resetInfo = document.getElementById('resetInfo');
var pauseInfo = document.getElementById('pauseInfo');




pause.disabled = true;
var d = document.getElementById('day');
var h = document.getElementById('hour');
var m = document.getElementById('minute');
var s = document.getElementById('second');

var startTimer = null;


function validateDays() {
    if (d.value < 0 || d.value > 365) {
        return "Number of Days can be in the range of 0 to 365";
    }
    return "";
}

function validateHours() {
    if (h.value < 0 || h.value > (365 * 24)) {
        return "Number of Hours can be in the range of 0 to " + (365 * 24);
    }
    return "";
}

function validateMinutes() {
    if (m.value < 0 || m.value > (365 * 24 * 60)) {
        return "Number of Minutes can be in the range of 0 to " + (365 * 24 * 60);
    }
    return "";
}

function validateSeconds() {
    if (s.value < 0 || s.value > (365 * 24 * 60 * 60)) {
        return "Number of Seconds can be in the range of 0 to " + (365 * 24 * 60 * 60);
    }
    return "";
}

function calculateTotalSeconds() {
    var daysEntered  = d.value;
    var hoursEntered  = h.value;
    var minutesEntered  = m.value;
    var secondsEntered  = s.value;
}

function validateTimerValues() {
    var validateMessage = "";
    validateMessage = validateDays();
    console.log("Mai aaya yaha")
    if (validateMessage.length > 0) {
        return validateMessage;
    }

    validateMessage = validateHours();
    if (validateMessage.length > 0) {
        return validateMessage;
    }

    validateMessage = validateMinutes();
    if (validateMessage.length > 0) {
        return validateMessage;
    }

    validateMessage = validateSeconds();
    if (validateMessage.length > 0) {
        return validateMessage;
    }
    return validateMessage;
}

function timer() {
    if (d.value == 0 && h.value == 0 && m.value == 0 && s.value == 0) {
        d.value = 0;
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if (s.value != 0) {
        s.value--;
    } else if (m.value != 0 && s.value == 0) {
        s.value = 60;
        m.value--;
    } else if (h.value != 0 && m.value == 0) {
        m.value = 60;
        h.value--;
    } else if (d.value != 0 && h.value == 0) {
        h.value = d.value * 24;
        d.value--;
    }
    return;

}

function stopTimer() {
    clearInterval(startTimer);
}

start.addEventListener('click', function () {
    if (!(d.value == 0 && h.value == 0 && m.value == 0 && s.value == 0)) {
        start.disabled = true;
        pause.disabled = false;
        // return;
    } else {
        alert('Kindly enter a value to start the timer');
        return;
    }

    var validationMessages = "";
    validationMessages = validateTimerValues();
    if (validationMessages.length > 0) {
        alert(validationMessages);
        start.disabled = false;
        pause.disabled = true;
        reset.disabled = false;
        throw new Error("Validation Failed");
    }

    startTimer = setInterval(function () {
        timer();
    }, 1000);
})



reset.addEventListener('click', function () {
    d.value = 0;
    h.value = 0;
    m.value = 0;
    s.value = 0;
    stopTimer();
    start.disabled = false;
    pause.disabled = true;
    pause.innerHTML = "Pause";
})


pause.addEventListener('click', function () {
    if (pause.innerHTML == "Pause") {
        stopTimer();
        pause.innerHTML = "Resume";
    } else {
        startTimer = setInterval(function () {
            timer();
        }, 1000);
        pause.innerHTML = "Pause";
    }

});
