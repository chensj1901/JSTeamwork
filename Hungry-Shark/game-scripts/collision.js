/**
 * Created by admin on 13-Jun-14.
 */
function sharkEats(shark, prey){
    for(var i; i < prey.length; i+=1) {
        var currentPrey = prey[i];

        if ((currentPrey.x >250 && currentPrey.x < 350)&& (shark.y-100 <= currentPrey.y) && (shark.y+100 >= currentPrey.y)){
            currentPrey.isEaten = true;
            //ToDo: health-bar update;
            //ToDo: score update;
        }
        prey[i]= currentPrey;
    }
    return prey;
}
function sharkCollides(shark){
    if( shark.y < 60 && shark.y > 580 ) //TODO: must use constants;
    {
        //console.log('shark must be dead');
        return false;
    }else{
        //console.log('shark must be alive');
        return true;
    }

};