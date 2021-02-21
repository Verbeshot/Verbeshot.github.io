
const body = document.getElementsByTagName("body");
const page = document.getElementById("viewport");
const camera = document.getElementById("camera");
const composition_a = document.getElementById("scene-0");
const composition_b = document.getElementById("scene-1");
const welcome =  document.getElementById("start");
const welcome_t = document.getElementById("start_text");
const doorframe = document.getElementById("doorframe");
const door = document.getElementById("door");
const rwall0 = document.getElementById("rwall-0");
const lwall0 = document.getElementById("lwall-0");
const ceiling0 = document.getElementById("ceiling-0");
const floor0 = document.getElementById("floor-0");
const tips = document.getElementById("tip-overlay");
const console = document.getElementById('console');
const skybox = document.getElementById('skybox');
const inspo = document.getElementById('inspirations');
const myname = document.getElementById('declaration2');

page.requestPointerLock = page.requestPointerLock ||
			     page.mozRequestPointerLock ||
			     page.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
			   document.mozExitPointerLock ||
			   document.webkitExitPointerLock;
document.exitPointerLock();

let zoom = 0;
let scrollaction = 0;
let speed = 100;
let skip = false;

welcome.addEventListener("mouseover", function(){vibrate(true)}); 
welcome.addEventListener("mouseout", function(){vibrate(false)});
welcome.addEventListener("click", startAnimation);

function vibrate(state) {
    if (state == true) {
        welcome.classList.add("vibrate");
    } else {
        welcome.classList.remove("vibrate");
    }
}

function startAnimation() {
    welcome.removeEventListener("click", startAnimation);
    welcome.removeEventListener("mouseover", function(){vibrate(true)});

    welcome.classList.toggle("paperfall");
    welcome_t.classList.toggle("textspasm");
    composition_a.classList.toggle("stagezoom1");

    if (skip == false) {
        setTimeout(() => {
            welcome_t.innerHTML = "Welcome";
            welcome_t.style.color = "var(--white-0)";
            floor0.innerHTML = "PARIS LUN";
            page.addEventListener("click", galleryload);
            tipoverlay('clicktoskip');
        }, 1800);
    }

    if (skip == false) {
        setTimeout(() => {
            rwall0.classList.toggle("wallswing-r");
            lwall0.classList.toggle("wallswing-l");
            ceiling0.classList.toggle("roofswing");
            floor0.classList.toggle("floorswing");
            floor0.innerHTML = "PRESENTS";
            if (skip == false) {
                setTimeout(() => {
                    rwall0.classList.add("floating-r");
                    lwall0.classList.add("floating-l");
                    ceiling0.classList.add("floating-t");
                }, 5000);
            }
            tipoverlay('goaway');
        }, 12000);
    }

    if (skip == false) {
        setTimeout(() => {
            door.style.backgroundColor = "var(--orange-0)";
            door.style.filter = "saturate(75%)";
            door.style.border = "0px";
            welcome.style.visibility = "hidden";
            if (skip == false) {
                setTimeout(() => {
                    doorframe.style.border = "solid";
                    door.classList.toggle("dooropen");
                    if (skip == false) {
                        setTimeout(() => {
                            page.style.cursor = "pointer";
                            page.removeEventListener("click", galleryload);
                            page.addEventListener("click", function(){transitionAnimation()});
                        }, 3000);
                    }
                    doorframe.classList.toggle("entranceglow");
                }, 2000);
            }
        }, 20000);
    }
    
}

function transitionAnimation() {
    page.style.cursor = "default";
    composition_a.classList.add('goinginside');
    setTimeout(() => {
        galleryload();
    }, 2000);
}

function galleryload() {
    page.removeEventListener("click", galleryload);
    skip = true;
    composition_a.remove();
    body[0].style.backgroundColor = "var(--white-0)";
    composition_b.style.display = "block";
    camera.style.perspectiveOrigin = "center";
    page.style.perspectiveOrigin = "center";
    page.style.perspective = "425px";
    zoom = -2000;
    composition_b.style.transform = `translate3d(${(posX)}px, ${(posY)}px, ${(zoom + posZ)}px)`;
    tipoverlay('freemovement');
    movement();
    camMovement();
    //camMovement();
}

function popup() {
    skip = true;
    inspo.style.display = "block";
    tipoverlay('remove');
}

let angleXZ = 0;
let angleYZ = 0;
let angleXY = 0;
let posX = 0;
let posY = 0;
let posZ = 0;

function movement() {
    document.addEventListener("wheel", (Event) => {
        scrollaction += 1;
        if (Event.deltaY > 0  && zoom < 4400 ) {
            zoom += speed;
            composition_b.style.transform = `translate3d(${(posX)}px, ${(posY)}px, ${(zoom + posZ)}px)`;
            if (scrollaction >= 10) {
                setTimeout(() => {
                    tips.style.display = "none";
                }, 5000);
            }
        } if (Event.deltaY < 0 && zoom >= -2000) {
            zoom -= speed;
            composition_b.style.transform = `translate3d(${(posX)}px, ${(posY)}px, ${(zoom + posZ)}px)`;
            if (scrollaction >= 10) {
                setTimeout(() => {
                    tips.style.display = "none";
                }, 5000);
            }
        }
    });
}

function resetMovement() {
    composition_b.style.transform = `translate3d(0,0,0)`;
}

function tipoverlay(flag) {
    if (flag == "freemovement") {
        tips.style.display = "block";
        tips.innerHTML = "Use Scrollbar to Move Around.";
    }

    if(flag == "clicktocontinue") {
        tips.style.display = "block";
        tips.innerHTML = "Or Click My Name to Continue";
    }

    if(flag == "clicktoskip") {
        tips.style.display = "block";
        tips.innerHTML = "Click to Skip";
    }

    if(flag == "goaway") {
        tips.style.display = "none";
    }

    if(flag == "remove") {
        tips.innerHTML = "Click Here to Go Back";
        tips.style.transform = "translate3d(500px;)";
        tips.addEventListener("click", (Event) => {
            inspo.style.display = "none";
            tipoverlay('clicktocontinue');
            skip=false;
        })
    }
}

//Here I attempt to make a camera. It does not work yet.

//var angleXY = 0; We don't need to tilt our heads

let adjustment = 0;

function calcPos() {
    posX = Math.sin(angleXZ*0.0174532925) * 425;
    posZ = 425 - Math.cos(angleXZ*0.0174532925) * 425;   
}

function camMovement() {
    page.requestPointerLock();
    page.addEventListener("mousemove", (Event) => {
        mouseX = Event.movementX;
        mouseY = Event.movementY;
        angleXZ += 0.09678*mouseX;
       // angleYZ += 0.09678*mouseY;
        //calcPos();

        camera.style.transform = `translateZ(425px) rotateY(${(1800-angleXZ)}deg) rotateX(${(1800-angleYZ)}deg) `;
        //composition_b.style.transform = `translate3d(-${(posX)}px, -${(posY)}px, -${(zoom + posZ)}px)`;

        console.innerHTML = `x: ${(mouseX)}, y: ${(mouseY)}, angleXZ: ${(angleXZ)}, angleYZ${(angleYZ)}, ${(adjustment)}`;
    })
}