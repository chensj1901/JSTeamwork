var canvas = document.getElementById("animation-canvas"),
    context = canvas.getContext('2d');

// Initialize objects
var shark = new Shark(context, 150, 250);
var prey = new Prey(context, 750, 250);
var healthBar = new HealthBar(3000, 3, 500);
var scores= new Scores();
var biteSound = new Audio('sounds/bite.wav');
var oceanFloorBackground = new BackgroundFeature(context, 'images/ocean-floor.png', 370, 4);
var boatBackground = new BackgroundFeature(context, 'images/boat.png', 42, 2);

var resetShark = true;
var fps = 5;

// User interaction
function onMouseClickEvent (event) {
    if (gameState === GameStatesEnum.HIGH_SCORES || gameState === GameStatesEnum.CREDITS) {
        //biteSound.play();
        gameState = GameStatesEnum.START_SCREEN;
        enterGameState(gameState);
    }

    // var x = event.offsetX,
    // y = event.offsetY;

	var x = event.hasOwnProperty('offsetX') ? event.offsetX : event.layerX;
	var y = event.hasOwnProperty('offsetY') ? event.offsetY : event.layerY;
	
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
	setInterval(function() {
		if (gameState === GameStatesEnum.GAME_ON) {
				if(resetShark) {
					resetShark = false;
					shark = new Shark(context, 150, 250);
					healthBar = new HealthBar(3000, 3, 500);
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

		if( shark.y < 40 || shark.y > 570 ) {
			console.log('over');
			gameState = GameStatesEnum.GAME_OVER;
			enterGameState(gameState);
		}
	}, 1000 / fps);
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