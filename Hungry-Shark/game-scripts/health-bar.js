function HealthBar(maxhp, constantDecreasehp, fishIncrementhp) {

    this.maxHP = maxhp; //tested with 300
    this.currentHP = this.maxHP;
    this.percentageHP = 1;
    this.constantDecreaseHP = constantDecreasehp; //tested with 1
    this.fishIncrementHP = fishIncrementhp;
    this.paper = Raphael(canvas.offsetLeft, canvas.offsetTop, 500, 50);

    this.constantHPRectangleWidth = 334;



    this.update=function(){
        //decreasing currentHP a fixed amount each frame
        this.currentHP -= this.constantDecreaseHP;
        //check if we are dead
        if (this.currentHP <= 0) {
            this.constantHPRectangleWidth = 0;
            //console.log("Dead");
        }
        //Logic when we eat a fish
        if (this.triggerFish()) {
            this.currentHP += this.fishIncrementHP;
          //  console.log("The Shark ate a fish")
        }
        //if we have more hp than we should;
        if (this.currentHP > this.maxHP) {
            this.currentHP = this.maxHP;
        }
        this.percentageHP = this.currentHP / this.maxHP;
    };
    //TODO: eat Fish Trigger --> this is a sample randomizer for fish eating.
    this.triggerFish=function()  {
        var randomFishTrigger = Math.random() * 100;
        if (randomFishTrigger <= 10) {
            return true;
        }
        else {
            return false;
        }
    };

    this.draw=function() {
        this.paper.clear();
        this.innerRect = this.paper.rect(9, 9, 334, 17, 2);
        this.outerRect = this.paper.rect(6, 6, 340, 23, 3);
        this.outerRect.attr({
            fill: "0-#dadada:0-#f3f3f3:100",
            stroke: "#7e7e7e",
            "stroke-width": 0.5
        });
        this.innerRect.attr({
            fill: "0-#dadada:0-#f3f3f3:100",
            stroke: "#7e7e7e",
            "stroke-width": 0.5
        });
        var healthPointsRect = this.paper.rect(9, 9, this.constantHPRectangleWidth * this.percentageHP, 17, 2);
        healthPointsRect.attr({
            fill: "0-#c14232:0-#f6928b:100",
            stroke: "#7e7e7e",
            "stroke-width": 0.5
        });


    };
}