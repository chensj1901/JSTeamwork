// Object constructors
function PlayerGameObject (context, initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.velocityX = 6;
    this.velocityY = 0.5;
    this.GRAVITY = 0.2;
    this.JUMP_HEIGHT = 10;

    this.draw = function () {

        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        context.stroke();
    }

    this.update = function () {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += this.GRAVITY;
    }

    this.jump = function () {
        this.velocityY -= this.JUMP_HEIGHT;
    }
}

function Background (context, imageSource, velocityX) {
    this.image = new Image();
    this.image.src = imageSource;
    this.x = 0;
    this.y = 350;

    this.draw = function () {
        // We draw the image normally (with the constant velocity on the X axis).
        context.drawImage(this.image, this.x, this.y);
        // We draw the image again at a position right after the first drawing by calculating
        // the X position of the end of the first drawing.
        context.drawImage(this.image, this.image.width - Math.abs(this.x), this.y);

        // As soon as the x position is more than the image width, we re-set it to 0.
        if (Math.abs(this.x) > this.image.width) {
            this.x = 0;
        }

        this.x -= velocityX;
    }
}