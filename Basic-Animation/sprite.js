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
	  that.context.clearRect(x, y, that.width, that.height);
	  
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
	