function Scores(){
this.score=0;

    this.update=function Update(){
        this.score+=1;
        if(healthBar.triggerFish()){
            this.score+=500;
        }
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