Bye = function() {
    var run = $("preloader", "status");
    var speed = 1;
    var timer = null;
    var alpha = 100;
    startrun(0);

    function startrun(target) {
        clearInterval(timer);
        timer = setInterval(function() {
            if (target > alpha) {
                speed = 2
            } else {
                speed = -2
            }
            if (alpha == target) {
                clearInterval(timer)
            } else {
                alpha = alpha + speed;
                run.style.filter = "alpha(opacity=" + alpha + ")";
                run.style.opacity = alpha / 100
            }
        }, 30)
    }
};
document.onreadystatechange = subSomething;

function subSomething() {
    if (document.readyState == "complete") {
        Bye();
        setTimeout(function() {
            SetNone($("preloader"), $("status"))
        }, 2e3)
    }
}
