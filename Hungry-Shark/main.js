var canvas = document.getElementById("animation-canvas"),
    context = canvas.getContext('2d');

var GameStatesEnum = {
    START_SCREEN: 0,
    GAME_ON: 1,
    GAME_OVER: 2,
    HIGH_SCORES: 3,
    CREDITS: 4,
    EXIT: 5
};

var gameState = GameStatesEnum.START_SCREEN;


// TODO: Add game states - initial screen with instructions, game on, game over, credits.
// Initialize objects
var shark = new Shark(context, 50, 250);
var prey = new Prey(context, 750, 250);

var healthBar = new HealthBar(300, 1, 5);
var scores= new Scores();

var oceanFloorBackground = new BackgroundFeature(context, 'images/ocean-floor.png', 370, 4);
var boatBackground = new BackgroundFeature(context, 'images/boat.png', 42, 2);

function drawCanvasTopBorder (positionY) {
    context.beginPath();
    context.moveTo(0, positionY);
    context.lineTo(canvas.width, positionY);
    context.stroke();
}

// TODO: Add mouse events for menu navigation.
// User interaction
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

function onMouseClickEvent (event) {
    var x = event.clientX,
        y = event.clientY;

    var newGameChoice = (473 <= x && x <= 647) && (277 <= y && y <= 330),
        highScoresChoice = (516 <= x && x <= 703) && (363 <= y && y <= 416),
        creditsChoice = (535 <= x && x <= 680) && (439 <= y && y <= 488),
        exitChoice = (476 <= x && x <= 583) && (514 <= y && y <= 563);

    if (newGameChoice) {
        gameState = GameStatesEnum.GAME_ON;
        enterGameState(gameState);
    }

    if (highScoresChoice) {
        gameState = GameStatesEnum.HIGH_SCORES;
        enterGameState(gameState);
    }

    if (creditsChoice) {
        gameState = GameStatesEnum.CREDITS;
        enterGameState(gameState);
    }

    if (exitChoice) {
        gameState = GameStatesEnum.EXIT;
        enterGameState(gameState);
    }
}

// Animation
function drawFrame () {
    context.clearRect(0, 0, canvas.width, canvas.height);

<<<<<<< HEAD
    healthBar.update();
    healthBar.draw();
  oceanFloorBackground.draw();
=======
    if (gameState == GameStatesEnum.GAME_ON) {
        healthBar.update();
        healthBar.draw();
        scores.draw();
        scores.update();
    }

>>>>>>> origin/master
    shark.update();
    shark.draw();

    prey.update();
    prey.draw();

  
    boatBackground.draw();
    drawCanvasTopBorder(40);

    window.requestAnimationFrame(drawFrame, canvas);
}

// TODO: Remove onMouseClickEvent listener playing (i.e. in GAME_ON)
// TODO: Remove spaceDownEvent listener when entering states other than GAME_ON?
// TODO: http://stackoverflow.com/questions/6087959/prevent-javascript-keydown-event-from-being-handled-multiple-times-while-held-do
function enterGameState(state) {
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
            alert('High Scores!');
            break;
        case GameStatesEnum.CREDITS:
            drawScreen(context, 'images/credits.png');
            break;
        case GameStatesEnum.EXIT:
            alert('Exit!');
            break;
        default:
            break;
    }
}

// The main game loop
function main() {
    enterGameState(gameState);
}

main();