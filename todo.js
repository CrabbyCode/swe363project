//* START TO-DO LIST

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("listed-container");
const alertMessage = document.getElementById("alert-message");
const urgencyRadios = document.querySelectorAll('input[name="priority"]');
const endDateInput = document.querySelector('input[name="Ended"]');

function addTask() {
    if (inputBox.value === '' || !isUrgencySelected(urgencyRadios) || endDateInput.value === '') {
        // Display alert message in red above the input box
        alertMessage.textContent = "Please fill in all fields!";
        alertMessage.style.color = "red";
        return;
    } else {
        // Clear alert message if input is not empty
        alertMessage.innerHTML = "";

        let li = document.createElement("li");
        // Construct task item text with input value, urgency, and date
        let taskText = `${inputBox.value} (Urgency: ${getSelectedUrgency()} - Deadline: ${endDateInput.value})`;
        li.textContent = taskText;
        listContainer.appendChild(li);

        li.addEventListener('click', function() {
            if (li.classList.contains('deleted')){
                li.remove();
            }
        })
        
        inputBox.value = ''; 

        li.addEventListener('click', function() {
            li.classList.toggle('checked');
        });
        
    }
}

function isUrgencySelected(urgencyRadios) {
    for (const radio of urgencyRadios) {
        if (radio.checked) {
            return true;
        }
    }
    return false;
}
function getSelectedUrgency() {
    for (const radio of urgencyRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

// Event listener for the Enter key press in the input box
inputBox.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        addTask();
    }
});


document.getElementById('deleteButton').addEventListener('click', function() {
    var listItems = document.querySelectorAll('#listed-container li');
    var isAnyDeleted = false;

    listItems.forEach(function(item) {
        if (item.classList.contains('deleted')) {
            isAnyDeleted = true;
        }
    });

    if (isAnyDeleted) {
        listItems.forEach(function(item) {
            item.classList.remove('deleted');
        });
    } else {
        listItems.forEach(function(item) {
            item.classList.add('deleted');
        });
    }

});

// Get the current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Disable past dates in the date inputs
document.addEventListener('DOMContentLoaded', function() {
    const startDateInput = document.querySelector('input[name="Started"]');
    const endDateInput = document.querySelector('input[name="Ended"]');
    
    startDateInput.min = getCurrentDate();
    endDateInput.min = getCurrentDate();
});

//* END TO-DO LIST

//& START TIMER

let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let currentTimer = null;

function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
}

showDefaultTimer();

function hideAll() {
    let timers = document.querySelectorAll(".timer-display");
    timers.forEach((timer) => (timer.style.display = "none"));
}

document
    .getElementById("pomodoro-session")
    .addEventListener("click", function () {
        hideAll();

        pomodoro.style.display = "block";
        currentTimer = pomodoro;
        });
document
    .getElementById("short-break")
    .addEventListener("click", function () {
        hideAll();

        short.style.display = "block";
        currentTimer = short;
        });
document
    .getElementById("long-break")
    .addEventListener("click", function () {
        hideAll();

        long.style.display = "block";
        currentTimer = long;
        });

let myInterval = null;

function startTimer(timerdisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    timerDuration = timerdisplay
        .getAttribute("data-duration")
        .split(":")[0];
    console.log(timerDuration);

    let durationinmiliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationinmiliseconds;

    myInterval = setInterval(function () {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerdisplay.textContent = "00:00";
            const alarm = new Audio(
            "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
            );
            alarm.play();
        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
            console.log(formattedTime);
            timerdisplay.textContent = formattedTime;
        }
        }, 1000);
    }

    document.getElementById("start").addEventListener("click", function () {
        if (currentTimer) {
            startTimer(currentTimer);
            document.getElementById("timer-message").style.display = "none"; 
        } else {
            document.getElementById("timer-message").style.display = "block";
        }
    });

document.getElementById("stop").addEventListener("click", function () {
        if (currentTimer) {
            clearInterval(myInterval);
        }
    });