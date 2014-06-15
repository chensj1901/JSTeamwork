function Scores(){
this.score=0;
this.shouldIncreaseScore=false;
    this.update=function Update(){
        this.score+=10;

        if(healthBar.isFishEaten){
            this.score+=5000;
        }
        healthBar.isFishEaten=false;
    }

    this.draw = function Draw(){
        var text=healthBar.paper.text(740,20,"Score: "+Math.round(this.score/100));
        text.attr({
            "font-size":"20px",
            "font-family": "Papyrus",
            "font-weight":"bold"
        });
    }
}