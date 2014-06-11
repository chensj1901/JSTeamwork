function Sprite(spriteSheet, x, y, width, height) {
    this.spritesheet = spriteSheet;
    this.offsetX = x;
    this.offsetY = y;
    this.width = width;
    this.height = height;
}

function initializeSprites(spriteSheet) {
    var playerGameObjectSprite =
        new Sprite(spriteSheet, 0, 0, 46, 46);
}