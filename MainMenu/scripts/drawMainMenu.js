(function () {    
    var menu = document.querySelector('div#main-menu-container>img');    
    menu.addEventListener('mousedown', checkForButtonClicked, true);
    document.onclick = function (event) { checkForButtonClicked(event); };

    function checkForButtonClicked(event) {        
        var x = event.clientX;
        var y = event.clientY;

        //alert(x + ' ' + y);

        // x 473-647, y 277-330 - New Game
        var newGameChoice = (473 <= x && x <= 647) && (277 <= y && y <= 330);
        
        // x 516-703, y 363-416
        var highScoresChoice = (516 <= x && x <= 703) && (363 <= y && y <= 416);

        // x 535-680, y 439-488
        var creditsChoice = (535 <= x && x <= 680) && (439 <= y && y <= 488);

        // x 476-583, y 514-563
        var exitChoice = (476 <= x && x <= 583) && (514 <= y && y <= 563);

        if (newGameChoice) {
            alert('New Game!');
            console.log('New Game!');
        }

        if (highScoresChoice) {
            alert('High Scores!');
            console.log('High Scores!');
        }

        if (creditsChoice) {
            //alert('Credits!');
            //console.log('Credits!');
            window.location.href = 'credits/Credits.html';
        }

        if (exitChoice) {
            alert('Exit!');
            console.log('Exit!');
        }                  
    }
}());


