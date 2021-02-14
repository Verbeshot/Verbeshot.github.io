
const page = document.getElementById("stage");
const canvas = document.getElementById("background");
const welcome =  document.getElementById("start");
const welcome_t = document.getElementById("start_text");
const doorframe = document.getElementById("doorframe");
const door = document.getElementById("door");

let zoom = 1;
let speed = 0.1;
let reset = false;

document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0  && zoom < 1 ) {
        page.style.transform = `scale(${(zoom += speed)})`;
    } if (event.deltaY < 0 && zoom >= 0.2) {
        page.style.transform = `scale(${(zoom -= speed)})`;
    }
});


function resetzoom() {
    page.style.transform = "scale(100%)";
}

welcome.addEventListener("mouseover", function(){vibrate(true)}); 
welcome.addEventListener("mouseout", function(){vibrate(false)});

function vibrate(state) {
    if (state == true) {
        welcome.classList.add("vibrate");
    } else {
        welcome.classList.remove("vibrate");
    }
}

welcome.addEventListener("click", startAnimation);

function startAnimation() {
    reset = false;
    welcome.removeEventListener("click", startAnimation);
    welcome.removeEventListener("mouseover", function(){vibrate(true)});

    welcome.classList.toggle("paperfall");
    welcome_t.classList.toggle("textspasm");
    canvas.classList.toggle("stagezoom");

        setTimeout(() => {
            if (reset == false) {
                welcome_t.innerHTML = "Welcome";
                welcome_t.style.color = "var(--white-0)";
            }
        }, 1800);

        setTimeout(() => {
            if (reset == false) {
                door.style.backgroundColor = "var(--orange-0)";
                door.style.filter = "saturate(75%)";
                door.style.border = "0px";
                welcome.style.visibility = "hidden";
                setTimeout(() => {door.classList.toggle("dooropen");}, 2000);
            }
        }, 12000);
    
}

function resetAll() {
    reset = true;
    welcome.addEventListener("click", startAnimation);
    welcome.addEventListener("mouseover", function(){vibrate(true)});
    welcome.addEventListener("mouseout", function(){vibrate(false)});

    welcome.classList.remove("paperfall");
    welcome_t.classList.remove("textspasm");
    canvas.classList.remove("stagezoom");

    welcome_t.innerHTML = "Hello";
    welcome_t.style.color = "var(--orange-0)";

    door.style.backgroundColor = "transparent";
    door.style.filter = "saturate(1)";
    door.style.border = "5px";
    welcome.style.visibility = "visible";
}