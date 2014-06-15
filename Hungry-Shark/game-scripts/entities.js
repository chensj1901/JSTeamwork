// Object constructors
function Shark (context, initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.velocityY = 0;
    this.GRAVITY = 0.2;
    this.JUMP_HEIGHT = 7;
	
	// Create sprite	
	sharkImage = new Image();	
	sharkImage.src = "images/shark.png";

	sharkSpr = sprite({
	context: canvas.getContext("2d"),
	width: 840,
	height: 100,
	x: this.x,
	y: this.y,
	image: sharkImage,
	numberOfFrames: 3,
	ticksPerFrame: 8
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
        this.velocityY = 0.5;
        this.velocityY -= this.JUMP_HEIGHT;
    };
}

function Prey(context, initialX, initialY) {
    this.preyArray = [];
    this.x = initialX;
    this.y = initialY;
    this.VELOCITY_X = 5;
    this.generatePreyFrequency = 0;
    this.update = function () {
        this.x -= this.VELOCITY_X;
        this.generatePreyFrequency+=5;
        if (this.generatePreyFrequency === 150) {
            var newPreyY = Math.floor(Math.random() * (540 - 20) + 60);
            this.preyArray.push({
                x: initialX,
                y: newPreyY,
                isEaten: function () {
                    if ((this.x > 300 && this.x < 340) && (shark.y <= this.y) && (shark.y + 60 >= this.y)) { //shark range widened for testing;
                        return true;
                    } else {
                        return false;
                    }
                }
            })
                this.generatePreyFrequency = 0;
        }

        for (var i = 0, len = this.preyArray.length; i < len; i+=1) {
            var currentPrey = this.preyArray[i];
            currentPrey.x-= this.VELOCITY_X;
            if ((currentPrey.x <0)|| (currentPrey.isEaten())) {
                this.preyArray.splice(i, 1);
                i-=1;
                len-=1;
            }
            if (currentPrey.isEaten()){
                biteSound.play();
                healthBar.isFishEaten=true;
            }
        }
    };

	fishImage = new Image();	
	fishImage.src = "images/prey-fish.png";

	fishSpr = sprite({
		context: canvas.getContext("2d"),
		width: 130,
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
			fishSpr.update();
			fishSpr.render(currentPrey.x, currentPrey.y);
        }
    };
}
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
