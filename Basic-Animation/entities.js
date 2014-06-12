// Object constructors
function Shark (context, initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.velocityY = 0.5;
    this.GRAVITY = 0.2;
    this.JUMP_HEIGHT = 10;
	
	// Create sprite	
	sharkImage = new Image();	
	sharkImage.src = "Shark-spite-40percent.png";

	sharkSpr = sprite({
	context: canvas.getContext("2d"),
	width: 670,
	height: 100,
	x: this.x,
	y: this.y,
	image: sharkImage,
	numberOfFrames: 3,
	ticksPerFrame: 10
	});

    this.draw = function () {
	    sharkSpr.update();
		sharkSpr.render(this.x, this.y);
    };

    this.update = function () {
        this.y += this.velocityY;
        this.velocityY += this.GRAVITY;
    };

    this.jump = function () {
        this.velocityY -= this.JUMP_HEIGHT;
    };
}

function Prey(context, initialX, initialY) {
    this.preyArray = [];

    // TODO: Prey needs to be an array of small fish with random positions.
    // TODO: Prey fish need to be removed from the array when eaten (collision detection) or when outside canvas.
    this.x = initialX;
    this.y = initialY;
    this.VELOCITY_X = 2;
    this.generatePreyFrequency = 0;
    this.update = function () {
        this.x -= this.VELOCITY_X;
        this.generatePreyFrequency+=1;
        if(this.generatePreyFrequency === 150) {
            var newPreyY = Math.floor(Math.random() * (560 - 20) + 60);
            this.preyArray.push({
                x: initialX,
                y: newPreyY
                // height: 50,
                // width: 50
            });
            this.generatePreyFrequency = 0;
        }

        for (var i = 0, len = this.preyArray.length; i < len; i+=1) {
            var currentPrey = this.preyArray[i];
            currentPrey.x-= this.VELOCITY_X;
            if (currentPrey.x < 100) { //100 to be changed to 0, now stays for testing purposes
                this.preyArray.splice(i, 1);
                i-=1;
                len-=1;
            }
        }
    };

	fishImage = new Image();	
	fishImage.src = "Fish-sprite-40percent.png";

	fishSpr = sprite({
		context: canvas.getContext("2d"),
		width: 105,
		height: 40,
		x: this.x,
		y: this.y,
		image: fishImage,
		numberOfFrames: 2,
		ticksPerFrame: 10
	});
	
    this.draw = function () {
        for (var i = 0, len = this.preyArray.length; i < len; i+=1) {
            var currentPrey = this.preyArray[i];
            //context.beginPath();
            //context.arc(currentPrey.x, currentPrey.y, 10, 0, 2 * Math.PI); // to be replaced by sprite
            //context.stroke();
			fishSpr.update();
			fishSpr.render(currentPrey.x, currentPrey.y);
        }
    };
}
// TODO: Add health bar animation (create object which will be updated and drawn).

function BackgroundFeature (context, imageSource, positionY, velocityX) {
    this.image = new Image();
    this.image.src = imageSource;
    this.x = 0;
    this.y = positionY;

    this.draw = function () {
        // We draw the image normally (with constant velocity on the X axis).
        context.drawImage(this.image, this.x, this.y);
        // We draw the image again at a position right after the first drawing by calculating
        // the X position of the end of the first drawing.
        context.drawImage(this.image, this.image.width - Math.abs(this.x), this.y);

        // As soon as the x position is more than the image width, we re-set it to 0.
        if (Math.abs(this.x) > this.image.width) {
            this.x = 0;
        }

        this.x -= velocityX;
    };
}
