//function Sprite(spriteSheet, x, y, width, height) {
//   this.spritesheet = spriteSheet;
//    this.offsetX = x;
//    this.offsetY = y;
//    this.width = width;
//    this.height = height;
//}

// TODO: Add sprite initialization.
// TODO: Add draw method to Sprite object.
//function initializeSprites(spriteSheet) {
//    var playerGameObjectSprite =
//        new Sprite(spriteSheet, 0, 0, 46, 46);
//}

function sprite (options) {

	var that = {},
		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;
	
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.x = options.x;
	that.y = options.y;
	that.image = options.image;
	
	that.update = function () {

		tickCount += 1;

		if (tickCount > ticksPerFrame) {

			tickCount = 0;
			
			// If the current frame index is in range
			if (frameIndex < numberOfFrames - 1) {	
				// Go to the next frame
				frameIndex += 1;
			} else {
				frameIndex = 0;
			}
		}
	};
	
	that.render = function (x, y) {
	
	  // Clear the canvas
	  //that.context.clearRect(x, y, that.width, that.height);
	  
	  // Draw the animation
	  that.context.drawImage(
		that.image,
		frameIndex * that.width / numberOfFrames,
		0,
		that.width / numberOfFrames,
		that.height,
		x,
		y,
		that.width / numberOfFrames,
		that.height);
	};
	
	return that;
}

function drawScreen(context, source) {
    var image = new Image();

    image.onload = function () {
        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
    };

    image.src = source;
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