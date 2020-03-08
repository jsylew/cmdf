let selected = false;

function select(id) {
    if (!selected) {
        document.getElementById(id).src = "../static/" + id + "-red.png";
        selected = true;
    }
    else {
        document.getElementById(id).src = "../static/" + id + ".png";
        selected = false;
    }
}