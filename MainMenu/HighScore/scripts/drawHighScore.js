(function () {
    var credits = document.querySelector('div#high-score-container>img');
    credits.addEventListener('mousedown', checkForButtonClicked, true);
    document.onclick = function (event) { checkForButtonClicked(event); };

    function checkForButtonClicked(event) {
        window.location.href = '../MainMenu.html';
    }
}());


