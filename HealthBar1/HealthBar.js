var maxHP=300;
var currentHP=maxHP;
var percentageHP;
var constantDecreaseHP=1;
var fishIncrementHP=5;

var constantHPRectangleWidth=334;

function Update(){
    currentHP-=constantDecreaseHP;
    if(currentHP<=0){
        constantHPRectangleWidth=0;
        console.log("Dead");
    }

    if(triggerFish()){
    currentHP+=fishIncrementHP;
    console.log("The Shark ate a fish")
    }
    if(currentHP>maxHP){
        currentHP=maxHP;
    }
    percentageHP=currentHP/maxHP;
}
function triggerFish(){
var randomFishTrigger=Math.random()*100;
    if(randomFishTrigger<=10){
        return true;
    }
    else{
        return false;
    }
}
function Draw() {
    var paper = Raphael(0, 0, 900, 600);
    var outerRect = paper.rect(30, 540, 340, 23, 3);
    outerRect.attr({
        fill: "0-#dadada:0-#f3f3f3:100",
        stroke: "#7e7e7e",
        "stroke-width":0.5
    });
    var innerRect = paper.rect(33, 543, 334, 17, 2);
    innerRect.attr({
        fill: "0-#dadada:0-#f3f3f3:100",
        stroke: "#7e7e7e",
        "stroke-width":0.5
    });
    var healthPointsRect = paper.rect(33, 543, constantHPRectangleWidth*percentageHP, 17, 2);
    healthPointsRect.attr({
        fill: "0-#c14232:0-#f6928b:100",
        stroke: "#7e7e7e",
        "stroke-width":0.5
    });
}
function Main(){
    do {
        Draw();
        Update();
    }while(currentHP>=0)
}
