let selected = false;
let running = false;
// let display = document.getElementById("time");
let startTime, endTime, newTime, timeInterval, usageTime;

$( document ).ready(function() {

    function select(id) {
        if (!selected) {
            document.getElementById(id).src = "../static/" + id + "-red.png";
            console.log("select");
            selected = true;
        } else {
            document.getElementById(id).src = "../static/" + id + ".png";
            selected = false;
        }
    }

    function runTimer() {
        if (!running) {
            startTime = new Date().getTime();
            timeInterval = setInterval(displayTime, 1000);
            document.getElementById("startStop").innerText = "Stop";
            running = true;
            console.log('start');
            $.get( "/stop_it", {
                status: 1
            },
                function(err, req, resp){
                window.location.href = "";
            });
        } else {
            console.log("stop");
            running = false;
            $.get( "/stop_it", {
                status: 0
            },
                function(err, req, resp){
                window.location.href = "";
            });
            document.getElementById("startStop").innerText = "Start";
            clearInterval(timeInterval);
            endTime = new Date().getTime();
            let sessionTime = endTime - startTime;
            document.getElementById("time").innerHTML = convertTime(sessionTime);
        }
    }

    function clearTimer() {
        clearInterval(timeInterval);
        document.getElementById("time").innerHTML = "00:00:00";
    }

    function displayTime() {
        let display = document.getElementById("time");
        endTime = new Date().getTime();
        newTime = endTime - startTime;
        usageTime = convertTime(newTime);
        display.innerHTML = usageTime;
    }

    function convertTime(time) {
        let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((time % (1000 * 60)) / 1000);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        usageTime = hours + ":" + minutes + ":" + seconds;
        return usageTime
    }

    var video = document.querySelector("#videoElement");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }

    $("#startStop").click(function(){
        runTimer();
    });
    $("#clearTime").click(function(){
        clearTimer();
    });
    $("#mobile").click(function() {
        select("mobile");
    });
    $("#drink").click(function() {
        select("drink");
    });
    $("#smoke").click(function() {
        select("smoke");
    });
    $("#snack").click(function() {
        select("snack");
    });
});