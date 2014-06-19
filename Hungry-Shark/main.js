var canvas = document.getElementById("animation-canvas"),
    context = canvas.getContext('2d');

// Cross-browser requestAnimationFrame
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000/60);
        });
}

// Initialize objects
var shark = new Shark(context, 150, 250);
var prey = new Prey(context, 750, 250);

var healthBar = new HealthBar(3000, 5, 330);
var scores= new Scores();
var highScore=0;
var $drawHighScore;
var $body = $('body');

var bloodImage = new Image();
bloodImage.src='images/blood.png'

var biteSound = new Audio('sounds/bite.wav');
var gameOverSound=new Audio('sounds/game_Over.wav');
var backgroundSong = new Audio('sounds/main.mp3');
backgroundSong.loop=true;

var oceanFloorBackground = new BackgroundFeature(context, 'images/ocean-floor.png', 370, 4);
var boatBackground = new BackgroundFeature(context, 'images/boat.png', 42, 2);

var resetShark = true;

// User interaction
function onMouseClickEvent (event) {
    if (gameState === GameStatesEnum.HIGH_SCORES || gameState === GameStatesEnum.CREDITS) {
        biteSound.play();
        $("body").find("span").remove();
        gameState = GameStatesEnum.START_SCREEN;
        enterGameState(gameState);
    }

    var x, y;
    if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
    } else {
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;

    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

	
    var newGameChoice = (473 <= x && x <= 647) && (277 <= y && y <= 330),
        highScoresChoice = (516 <= x && x <= 703) && (363 <= y && y <= 416),
        creditsChoice = (535 <= x && x <= 680) && (439 <= y && y <= 488),
        exitChoice = (476 <= x && x <= 583) && (514 <= y && y <= 563);

    if (newGameChoice) {
        biteSound.play();		
        gameState = GameStatesEnum.GAME_ON;
		resetShark = true;
        enterGameState(gameState);
    }

    if (highScoresChoice) {	
        biteSound.play();
        gameState = GameStatesEnum.HIGH_SCORES;
        enterGameState(gameState);
    }

    if (creditsChoice) {
        biteSound.play();
        gameState = GameStatesEnum.CREDITS;
        enterGameState(gameState);
    }

    if (exitChoice) {
        biteSound.play();
        gameState = GameStatesEnum.EXIT;
        enterGameState(gameState);
    }
}

var spaceButtonDown = false;

function spaceDownEvent (event) {
    if (event.keyCode === 32) {
        if (!spaceButtonDown) {
            spaceButtonDown = true;
            shark.jump();
        }
    }
}

function spaceUpEvent (event) {
    spaceButtonDown = false;
}

// Drawing and animation
function drawCanvasTopBorder (positionY) {
    context.beginPath();
    context.moveTo(0, positionY);
    context.lineTo(canvas.width, positionY);
    context.stroke();
}

function drawFrame () {
	if (gameState === GameStatesEnum.GAME_ON) {
        if(resetShark) {
            backgroundSong.play();
            resetShark = false;
            prey.preyArray=[];
            shark = new Shark(context, 150, 250);
            healthBar = new HealthBar(3000, 6, 330);
            scores = new Scores();
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        oceanFloorBackground.draw();
        shark.update();
        shark.draw();
        prey.update();
        prey.draw();
        healthBar.update();
        healthBar.draw();
        scores.update();
        scores.draw();
        boatBackground.draw();

        drawCanvasTopBorder(40);

        window.requestAnimationFrame(drawFrame, canvas);
	}

	if( shark.y < 40 || shark.y > 570 || healthBar.currentHP<=0 ) {
        backgroundSong.pause();
        backgroundSong.currentTime=0;
        gameOverSound.play();
		gameState = GameStatesEnum.GAME_OVER;
		enterGameState(gameState);
        if(highScore<scores.score){
            highScore=scores.score;
        }
        healthBar.paper.remove();
	}
}

// Game states
var GameStatesEnum = {
    START_SCREEN: 0,
    GAME_ON: 1,
    GAME_OVER: 2,
    HIGH_SCORES: 3,
    CREDITS: 4,
    EXIT: 5
};

var gameState = GameStatesEnum.START_SCREEN;

function enterGameState(gameState) {
    switch (gameState) {
        case GameStatesEnum.START_SCREEN:
            window.addEventListener('click', onMouseClickEvent, false);
            drawScreen(context, 'images/start-screen.png');
            break;
        case GameStatesEnum.GAME_ON:
            window.addEventListener('keydown', spaceDownEvent, false);
            window.addEventListener('keyup', spaceUpEvent, false);
            window.requestAnimationFrame(drawFrame, canvas);
            break;
        case GameStatesEnum.GAME_OVER:
            window.addEventListener('click', onMouseClickEvent, false);
            drawScreen(context, 'images/game-over.png');
            break;
        case GameStatesEnum.HIGH_SCORES:
            drawScreen(context, 'images/high-scores.png');
            $drawHighScore=$("<span>").text(Math.round(highScore/100));
            $drawHighScore.offset({top:canvas.offsetTop+150,left:canvas.offsetLeft+260});
            $body.append($drawHighScore);
            break;
        case GameStatesEnum.CREDITS:
            drawScreen(context, 'images/credits.png');
            break;
        case GameStatesEnum.EXIT:
            if (window.home) {
                window.home();
            } else {
                if (navigator.appVersion.split('MSIE')[1] <= 7) {
                    window.location = 'about:home';
                } else if (window.location.href) {
                    window.location.href = 'https://www.google.com/?hl=en';
                }
            }
            break;
        default:
            break;
    }
}

// Game starts
function main() {
    enterGameState(gameState);
}

main();