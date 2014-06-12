function Scores(){
this.score=0;

    this.update=function Update(){
        this.score+=1;
        if(healthBar.triggerFish()){
            this.score+=100;
        }
    }

    this.draw = function Draw(){
        healthBar.paper.text(400,20,"Score: "+this.score);
    }
}