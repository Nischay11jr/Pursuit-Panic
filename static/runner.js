let canvas;
let context;
let request_id;
let gameOver = false;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now()

let backgroundImage = new Image();
let nightbackgroundImage = new Image();
let bgPosy = 0;
let bgSwitchTime = 5000; // switch backgrounds every 5 seconds
let bgSwitchTimer = bgSwitchTime;

let car = {
    x: 300,
    y: 300,
    width: 60,
    height: 90,
    xChange: 7,
    yChange: 7
}

let obstacle1 = {
    x: randint(130, 680),
    y: 0,
    size: 30,
    yChange: 5
};

let obstacle2 = {
    x: randint(130, 680),
    y: 0,
    size: 30,
    yChange: 5
}

let obstacle3 = {
    x: randint(130, 680),
    y: 0,
    size: 30,
    yChange: 5
}

let obstacle4 = {
    x: randint(130, 680),
    y: 0,
    size: 30,
    yChange: 5
};

let coins = {
    x: randint(130, 680),
    y: 0,
    size: 30,
    yChange: 5
};

let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];
let carImage = new Image;
let obstacle1Image = new Image;
let obstacle2Image = new Image;
let obstacle3Image = new Image;
let obstacle4Image = new Image;
let coinImage = new Image;


let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let score = 0;
let coinCounter = 0;
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
let coin_grab = document.getElementById("coin_grab");
// let muteButton = document.getElementById("muteButton");
// let mute = false;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([
        { "var": backgroundImage, "url": "static/background.png" },
        { "var": carImage, "url": "static/car1.png" },
        { "var": obstacle1Image, "url": "static/oil_spill.png" },
        { "var": obstacle2Image, "url": "/static/obstacle_car1.png" },
        { "var": obstacle3Image, "url": "/static/obstacle_car2.png" },
        { "var": obstacle4Image, "url": "/static/woodlog.png" },
        { "var": coinImage, "url": "static/coins.png" },
        { "var": nightbackgroundImage, "url": "static/nightbackground.jpg" },

    ], draw);
}


function draw() {
    window.requestAnimationFrame(draw);

    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }

    request_id = window.requestAnimationFrame(draw);
    then = now - (elapsed % fpsInterval);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // incrementing the background position' speed
    bgPosy += 2.5;


    // drawing the first background image
    context.drawImage(backgroundImage, 0, bgPosy % canvas.height, canvas.width, canvas.height);
    if (bgPosy > 0) {
        context.drawImage(backgroundImage, 0, 0 - (canvas.height - (bgPosy % canvas.height)), canvas.width, canvas.height);
    } else {
        context.drawImage(backgroundImage, 0, bgPosy % canvas.height - canvas.height, canvas.width, canvas.height);
    }



    // creating oil spill (obstacle 1)
    context.drawImage(obstacle1Image, obstacle1.x, obstacle1.y, obstacle1.size + 30, obstacle1.size + 10)
    obstacle1.y += obstacle1.yChange;


    if (obstacle1.y + obstacle1.size > canvas.height) {
        obstacle1.x = randint(150, 600);
        obstacle1.y = 0;
    }


    // creating coins
    context.drawImage(coinImage, coins.x, coins.y, coins.size + 30, coins.size + 10)
    coins.y += coins.yChange;


    if (coins.y + coins.size > canvas.height) {
        coins.x = randint(150, 600);
        coins.y = 0;
    }



    //creating the player car
    context.drawImage(carImage, car.x, car.y, car.width, car.height)
    context.fillStyle = "red";


    //movements of the player car
    if (moveRight) {
        car.x = Math.min(car.x + car.xChange, 680 - car.width);
    }

    if (moveUp) {
        car.y = Math.max(car.y - car.yChange, 0);
    }

    if (moveDown) {
        car.y = Math.min(car.y + car.yChange, canvas.height - car.height);
    }

    if (moveLeft) {
        car.x = Math.max(car.x - car.xChange, 130);
    }


    context.font = "20px Arial";
    context.fillText("Score: " + score, 680, 50);
    audio1.play();

    // incrementing the score only when the game is running
    if (gameOver === false) {
        score += 1;
    }


    // writing the Coins
    context.font = "20px Arial";
    context.fillText("Coins Collected: " + coinCounter, 620, 80);


    // Detect collision between car and coins
    if (car.x < coins.x + coins.size &&
        car.x + car.width > coins.x &&
        car.y < coins.y + coins.size &&
        car.y + car.height > coins.y) {
        // Coin collected
        coinCounter += 1;
        coins.x = randint(130, 680);
        coins.y = 0;
        coin_grab.play();

    }


    // *DIFFICULTIES OF THE GAME* //

    // increasing speed when score reaches a certain score
    if (score >= 1000) {

        // (obstacle2) creating 1st car obstacle 
        context.drawImage(obstacle2Image, obstacle2.x, obstacle2.y, obstacle2.size + 55, obstacle2.size + 73)
        obstacle2.y += obstacle2.yChange;

        if (obstacle2.y + obstacle2.size > canvas.height) {
            obstacle2.x = randint(150, 640);
            obstacle2.y = 0;
        }

        bgPosy += 3.0;
        obstacle1.yChange = 5.25;
        obstacle1.y += obstacle1.yChange;
        obstacle2.yChange = 5.25;
        obstacle2.y += obstacle2.yChange;
        coins.yChange = 5.25;
        coins.y += coins.yChange;

    }

    if (score >= 2000) {

        // (obstacle3) creating 2nd car obstacle 
        context.drawImage(obstacle3Image, obstacle3.x, obstacle3.y, obstacle3.size + 55, obstacle3.size + 73);
        obstacle3.y += obstacle3.yChange;

        if (obstacle3.y + obstacle3.size > canvas.height) {
            obstacle3.x = randint(150, 640);
            obstacle3.y = 0;
        }

        bgPosy += 3.25;
        coins.yChange = 5.5;

    }


    if (score >= 3000) {

        // (obstacle 4) creating wood log 
        context.drawImage(obstacle4Image, obstacle4.x, obstacle4.y, obstacle4.size + 30, obstacle4.size + 10)
        obstacle4.y += obstacle4.yChange;

        if (obstacle4.y + obstacle4.size > canvas.height) {
            obstacle4.x = randint(150, 600);
            obstacle4.y = 0;
        }

        bgPosy += 4;
        coins.yChange = 5.25;

    }

    if (score >= 4000){
        bgPosy += 4.25;
        coins.yChange = 5.5;
    }


    // playing second audio
    if (score <= 1200 && score >= 1000 || score <= 2200 && score >= 2000 || score <= 3300 && score >= 3000) {
        audio2.play();

    }


    // avoiding collisions of obstacles
    if (obstacle1.x < obstacle2.x + obstacle2.size &&
        obstacle1.x + obstacle1.size > obstacle2.x &&
        obstacle1.y < obstacle2.y + obstacle2.size &&
        obstacle1.y + obstacle1.size > obstacle2.y) {
        obstacle2.x = randint(150, 630);
        obstacle2.y = 0;
    } else if (obstacle1.x < obstacle3.x + obstacle3.size &&
        obstacle1.x + obstacle1.size > obstacle3.x &&
        obstacle1.y < obstacle3.y + obstacle3.size &&
        obstacle1.y + obstacle1.size > obstacle3.y) {
        obstacle3.x = randint(150, 630);
        obstacle3.y = 0;

    } else if (obstacle1.x < obstacle4.x + obstacle4.size &&
        obstacle1.x + obstacle1.size > obstacle4.x &&
        obstacle1.y < obstacle4.y + obstacle4.size &&
        obstacle1.y + obstacle1.size > obstacle4.y) {
        obstacle4.x = randint(150, 630);
        obstacle4.y = 0;

    }

    if (obstacle2.x < obstacle3.x + obstacle3.size &&
        obstacle2.x + obstacle2.size > obstacle3.x &&
        obstacle2.y < obstacle3.y + obstacle3.size &&
        obstacle2.y + obstacle2.size > obstacle3.y) {
        obstacle3.x = randint(150, 630);
        obstacle3.y = 0;

    } else if (obstacle2.x < obstacle4.x + obstacle4.size &&
        obstacle2.x + obstacle2.size > obstacle4.x &&
        obstacle2.y < obstacle4.y + obstacle4.size &&
        obstacle2.y + obstacle2.size > obstacle4.y) {
        obstacle4.x = randint(150, 630);
        obstacle4.y = 0;
    }


    if (obstacle3.x < obstacle4.x + obstacle4.size &&
        obstacle3.x + obstacle3.size > obstacle4.x &&
        obstacle3.y < obstacle4.y + obstacle4.size &&
        obstacle3.y + obstacle3.size > obstacle4.y) {
        obstacle4.x = randint(150, 630);
        obstacle4.y = 0;
    }


    // COLLISIONS

    // collisions with the first obstacle
    if (car.x < obstacle1.x + obstacle1.size &&
        car.x + car.width > obstacle1.x &&
        car.y < obstacle1.y + obstacle1.size &&
        car.y + car.height > obstacle1.y) {
        score += 0;
        stop();
        gameOver = true;
    }

    // collisions with the second obstacle
    if (car.x < obstacle2.x + obstacle2.size &&
        car.x + car.width > obstacle2.x &&
        car.y < obstacle2.y + obstacle2.size &&
        car.y + car.height > obstacle2.y) {
        
        score += 0;
        stop();
        gameOver = true;

    }

    // collisions with the third obstacle
    if (car.x < obstacle3.x + obstacle3.size &&
        car.x + car.width > obstacle3.x &&
        car.y < obstacle3.y + obstacle3.size &&
        car.y + car.height > obstacle3.y) {
        score += 0;
        gameOver = true;
    }

    // collisions with the fourth obstacle
    if (car.x < obstacle4.x + obstacle4.size &&
        car.x + car.width > obstacle4.x &&
        car.y < obstacle4.y + obstacle4.size &&
        car.y + car.height > obstacle4.y) {
        score += 0;
        gameOver = true;
    }



    //when game is stopped 
    if (gameOver === true) {
        context.font = "bold 40px Arial";
        context.fillText("GAME OVER!", canvas.width / 2 - 100, canvas.height / 2);
        score += 0;
        obstacle1.y = -100;
        obstacle2.y = -100;
        obstacle3.y = -100;
        obstacle4.y = -100;
        obstacle1.yChange = 0;
        obstacle2.yChange = 0;
        obstacle3.yChange = 0;
        obstacle4.yChange = 0;
        coins.y = 0;
        coins.yChange = 0;
        bgPosy = 0;
        audio1.pause();
        audio2.pause();
        coin_grab.pause();
        deactivate(key);
        stop();
    }
}


function activate(event) {
    let key = event.key;

    if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}


function deactivate(event) {
    let key = event.key

    if (key == "ArrowUp") {
        moveUp = false;
    } else if (key == "ArrowLeft") {
        moveLeft = false;
    } else if (key == "ArrowRight") {
        moveRight = false;
    } else if (key == "ArrowDown") {
        moveDown = false;
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };

    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio")
            element.addEventListener("canplaythrough", loaded, false);
        }

        element.src = asset.url;
    }
}


function car_collides(o) {
    if (car.x + car.size < o.x || o.x + o.size < car.x || car.y > o.y + o.size || o.y > car.y + car.size) {
        return false;
    } else {
        gameOver = true;
        return true;
    }
}

function stop() {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
}

// function mute(){
//     if (mute) {
//         audio1.muted = false;
//         audio2.muted = false;
//         coin_grab.muted = false;
//         mute = false;
//     } else {
//         audio1.muted = true;
//         audio2.muted = true;
//         coin_grab.muted = true;
//         mute = true;
//     }

//     console.log("muted");
// }