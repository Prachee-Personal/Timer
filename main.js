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
var end = document.getElementById('end');

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

function validateMaxTimeAllowed(totalSecondsCalculated) {
    if (totalSecondsCalculated > (365 * 24 * 60 * 60)) {
        return "Entered time is greater than 365 days";
    }
    return "";
}

function calculateTotalSeconds() {
    var daysEntered = d.value;
    var hoursEntered = h.value;
    var minutesEntered = m.value;
    var secondsEntered = s.value;
    console.log("hoursEntered", hoursEntered);
    console.log("daysEntered", daysEntered);
    console.log("minutesEntered", minutesEntered);
    console.log("secondsEntered", secondsEntered);
    var totalSecondsCalculated = Number(daysEntered * 24 * 60 * 60) + Number(hoursEntered * 60 * 60) +
        Number(minutesEntered * 60) + Number(secondsEntered);
    return totalSecondsCalculated;
}

function validateTimerValues() {
    var validateMessage = "";
    validateMessage = validateDays();

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
    var totalSecondsCalculated = calculateTotalSeconds();

    validateMessage = validateMaxTimeAllowed(totalSecondsCalculated);
    if (validateMessage.length > 0) {
        return validateMessage;
    } else {
        setDisplayTime(totalSecondsCalculated);
    }
    return validateMessage;
}

function setDisplayTime(totalSecondsCalculated) {
    if (totalSecondsCalculated >= Number(24 * 60 * 60)) {
        d.value = Math.floor(totalSecondsCalculated / Number(24 * 60 * 60));
        totalSecondsCalculated = totalSecondsCalculated % Number(24 * 60 * 60);
    } else {
        d.value = 0;
    }

    if (totalSecondsCalculated >= Number(60 * 60)) {
        h.value = Math.floor(totalSecondsCalculated / Number(60 * 60));
        totalSecondsCalculated = totalSecondsCalculated % Number(60 * 60);
    } else {
        h.value = 0;
    }

    if (totalSecondsCalculated >= Number(60)) {
        m.value = Math.floor(totalSecondsCalculated / Number(60));
        totalSecondsCalculated = totalSecondsCalculated % Number(60);
    } else {
        m.value = 0;
    }

    if (totalSecondsCalculated < Number(60)) {
        s.value = totalSecondsCalculated;
    }
}

function timer() {
    if (d.value == 0 && h.value == 0 && m.value == 0 && s.value == 0) {
            clearInterval(startTimer)
            document.getElementById("end").innerHTML = "TIME EXPIRED";
            pause.disabled = true;
    } else if (s.value != 0) {
        s.value--;
    } else if (m.value != 0 && s.value == 0) {
        s.value = 60;
        m.value--;
    } else if (h.value != 0 && m.value == 0) {
        m.value = 60;
        h.value--;
    } else if (d.value != 0 && h.value == 0) {
        h.value = 24;
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
    document.getElementById("end").innerHTML = "";
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


