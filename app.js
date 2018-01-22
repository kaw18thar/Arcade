// Enemies our player must avoid
"use strict";
var consecutiveWins=0;

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies,this uses
    // a helper we've provided to easily load images
    this.sprite = 'enemy-bug.png';
    this.originX = 0;
    this.originY = 0
    this.newX = 0;
    this.newY = 0;
    this.speed = Math.ceil(Math.random() * 300) + 20; //the speed is generated randomly
    this.generateYPosition();

};
var Collectible= function(){
    this.sprite = 'collect.png';
    this.originX = 0;
    this.originY = 0
    this.newX = 0;
    this.newY = 0;
    this.count=0;
    // this.speed = Math.ceil(Math.random() * 300) + 20; //the speed is generated randomly
    this.generateXYPosition();
};
// Collectible.prototype= Object.create(Enemy.prototype);
// Collectible.prototype.constructor= Collectible;
Collectible.prototype.collide= function (player){
    if ((player.newX + 85) > this.newX && player.newX < (this.newX ) && (player.newY + 90) > this.newY && player.newY < (this.newY)) {
        player.collect();
        this.update();
    }

};
Collectible.prototype.render= function(){
     ctx.drawImage(Resources.get(this.sprite), this.newX, this.newY);
};
Collectible.prototype.generateXYPosition = function() { //generate random Yposition for enemies (it must be contained within the brick columns)
    var randomFactor = Math.ceil(Math.random() * 10); // we will use this random factor to choose an originY between three positions on the brick-rows

    if (randomFactor <= 3) {
        this.originY = 230;
        this.originX= 225;
    } else if (randomFactor > 3 && randomFactor <= 6) {
        this.originY = 145;
        this.originX=125;
    } else {
        this.originY = 300;
         this.originX=25;
         this.sprite='collect.png'; 
    }

    this.newY = this.originY;
    this.newX = this.originX;
}; 
Collectible.prototype.update = function (){
    // this.generateXYPosition();
    var random = Math.ceil(Math.random() * 10);
    var randomFactor = Math.ceil(Math.random() * 10); // we will use this random factor to choose an originY between three positions on the brick-rows
    if (random>5)
    {if (randomFactor <= 3) {
            this.originY = 230;
            this.originX= 124;
            this.sprite='collect3.png'; 
        } else if (randomFactor > 3 && randomFactor <= 6) {
            this.originY = 145;
            this.originX=23;
        } else {
            this.originY = 300;
            this.originX=327;
            this.sprite='collect.png'; 
        }
    
        this.newY = this.originY;
        this.newX = this.originX;}
        else {
            this.generateXYPosition();
        }
};

Enemy.prototype.detectCollision = function(player) {
    if ((player.newX + 80) > this.newX && player.newX < (this.newX + 90) && (player.newY + 85) > this.newY && player.newY < (this.newY + 80)) {
        player.resetLoc();
    }
};

Enemy.prototype.generateYPosition = function() { //generate random Yposition for enemies (it must be contained within the brick columns)
    var randomFactor = Math.ceil(Math.random() * 10); // we will use this random factor to choose an originY between three positions on the brick-rows

    if (randomFactor <= 3) {
        this.originY = 60;
    } else if (randomFactor > 3 && randomFactor <= 6) {
        this.originY = 145;
    } else {
        this.originY = 230;
    }

    this.newY = this.originY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.newX = this.newX + this.speed * dt; // I previously used a single x-postion but the game didn't loop, after asking my colleagues and re-reading and re-reading again the project description , I introduced a new x-position attribute and set it initially to an initial value 
    //the new X will be updated with speed factor
    if (this.newX > 505) {
        this.newX = this.originX;
        this.generateYPosition(); // new enemy position on Y
        this.speed = Math.ceil(Math.random() * 300); //new speed is generated randomly
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.newX, this.newY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.sprite = "";
    this.newSprite = "";
    this.originX = 405;
    this.originY = 400;
    this.newX = 405;
    this.newY = 400;
    this.lives = 5;
    this.contx = null;
    this.won = false;
    this.setNew = false;
    this.lost = false;
    this.consecutiveWins=0;
    this.lastY=this.originY;
    this.collectible=0;

};

Player.prototype.update = function() {
		// I simplified the code by deleting the parameters her and on the call at engine.js and found that my code works perfectly fine without anything in this function!!
		// I could delete it even and it won't affect anything in my game!

};

Player.prototype.render = function() {
    // drawing the player now
    ctx.drawImage(Resources.get(this.newSprite), this.newX, this.newY);
    ctx.font = '14pt serif';
    ctx.strokeStyle = 'blue';
    var l = "Tries: " + this.lives;
    ctx.strokeText(l,  20, 566);
    ctx.font = '14pt serif';
    ctx.strokeStyle = 'black';
    var t = "Choose the player at the star location by pressing from 1 to 5";
    ctx.fillStyle = 'white';
    ctx.strokeText(t, 20, 20);
    ctx.fillText(t, 20, 20);
    var consecutive= "Consecutive Wins: "+ this.consecutiveWins;
    ctx.strokeText(consecutive, 330, 566);
    ctx.fillText(consecutive, 330, 566);
    ctx.fillStyle = 'blue';
    var collected= "Collectible: "+ this.collectible;
    ctx.strokeText(collected, 20, 50);
    ctx.fillText(collected, 20, 50);

    if (this.won === true) {
        var image = new Image(); // creates a new image to insert it as the player
        image.src = "begin.png"; // loads the source for the player object
        ctx.drawImage(image, 90, 150);
        ctx.font = '20pt Impact';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.strokeText("You Won!☼☺♫♪", 152, 180);
        ctx.fillText("You Won!☼☺♫♪", 152, 180);
        ctx.strokeText("Press 'Enter' to Play Again!", 152, 220);
        ctx.fillText("Press 'Enter' to Play Again!", 152, 220);
        this.setNew = false;
        if(this.hello=== true && this.lastY===-25){
                this.consecutiveWins++;
                this.hello=false; //to prevent this.consecutiveWins form incrementing excessively
        }


    }
    if (this.lives <= 0) {
        ctx.font = '20pt Impact';
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'white';
        ctx.fillText("You Lost!☼ لقد خسرت", 140, 220);
        ctx.strokeText("You Lost!☼ لقد خسرت", 140, 220);
        ctx.fillText("Press 'Enter' To Try Again!☼", 100, 280);
        ctx.strokeText("Press 'Enter' To Try Again!☼", 100, 280);
        this.newX = this.originX;
        this.newY = this.originY;
        this.consecutiveWins=0;
        this.lastY=this.originY;
   }
};
Player.prototype.collect= function(){
    this.collectible++;
    var collect1 = new Collectible();
    var collect2 = new Collectible();
    var collect3 = new Collectible();
    var collectible = [collect1, collect2, collect3];
    collectible.forEach (function (collect){
        collect.render();
        collect.generateXYPosition();
    });

};

Player.prototype.handleInput = function(inputKey) {
    if (inputKey === 'right') {
        if (this.newX === 405 || this.won === true || this.lost === true || this.lives === 0) {
            this.newX = this.newX; // x position is unchanged if the player on the right end of canvas or if he is in the winning position
        } else {
            this.newX += 101; // position is shifted to the right
        }
    }
    if (inputKey === 'left') {
        if (this.newX <= 101 || this.won === true || this.lost === true || this.lives === 0) {
            this.newX = this.newX; // x position is unchanged if the player on the left end of canvas or if he is in the winning position
        } else {
            this.newX -= 101; // position is shifted to the left
        }
    }
    if (inputKey === 'up') { //|| this.won===true
        if (this.newY <= 65) {
            this.lastY=this.newY-85; // this variable is just a position handler, it doesn't affect our player's movement
            this.newY = -25; // position is shifted up for the last time; this is where he wins! or if he is in the winning position
            this.won = true;
            this.hello= true;
        } else if (this.lost !== true && this.lives > 0) {

            this.newY -= 85; // position is shifted up only if the player is not losing
        }
    }

    if (inputKey === 'down') {
        if (this.newY === 400 || this.won === true || this.lost === true) {
            this.newY = this.newY; // y position is unchanged if the player on the bottom end of canvas or if he is in the winning position
        } else {
            this.newY += 85; // position is shifted down
        }
    }

    if (inputKey === '1' && this.newX === 405 && this.newY === 400) {
        this.newSprite = "char-horn-girl.png";
    } else if (inputKey === '2' && this.newX === 405 && this.newY === 400) {
        this.newSprite = "char-pink-girl.png";
    } else if (inputKey === '3' && this.newX === 405 && this.newY === 400) {
        this.newSprite = "char-princess-girl.png";
    } else if (inputKey === '4' && this.newX === 405 && this.newY === 400) {
        this.newSprite = "char-cat-girl.png";
    } else if (inputKey === '5' && this.newX === 405 && this.newY === 400) {
        this.newSprite = "char-boy.png";
    }
    if (inputKey === 'enter') {
        this.won = false;
        if (this.newY!==-25){ // player only gets new lives if he is not winning, put another way, in the winning y-position
            this.lives = 5;}
        this.newX = this.originX;
        this.newY = this.originY;
        this.lost = false;
        this.setNew = true;
        var collect1 = new Collectible();
        var collect2 = new Collectible();
        var collect3 = new Collectible();
        var collectible = [collect1, collect2, collect3];
    }
};

Player.prototype.pSelector = function() {
    //choosing a player character randomly
    var ran = Math.random(); //generating a random number
    ran = ran * 10; // multiplying by 10 to get the first digit of the random number
    ran = Math.ceil(ran); // ceiling to make it a single digit number
    if (ran === 1 || ran === 2) {
        this.sprite = "char-horn-girl.png";
        this.newSprite = this.sprite;
    } else if (ran === 3 || ran === 4) {
        this.sprite = "char-pink-girl.png";
        this.newSprite = this.sprite;
    } else if (ran === 5 || ran === 6) {
        this.sprite = "char-princess-girl.png";
        this.newSprite = this.sprite;
    } else if (ran === 7 || ran === 8) {
        this.sprite = "char-cat-girl.png";
        this.newSprite = this.sprite;
    } else {
        this.sprite = "char-boy.png";
        this.newSprite = this.sprite;
    }
};

Player.prototype.resetLoc = function() {
    this.newX = this.originX;
    this.newY = this.originY;
    this.lives--;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var int = 0;



var e1 = new Enemy();
var e2 = new Enemy();
var e3 = new Enemy();
var e4 = new Enemy();
var e5 = new Enemy();
var e6 = new Enemy();
var arr = [e1, e2, e3];
var allEnemies = arr;

var collect1 = new Collectible();
var collect2 = new Collectible();
collect1.count++;
collect2.count++;
var collect3 = new Collectible();
collect3.count++;
var collectible = [collect1, collect2, collect3];

//Thank you for your advice, actually even using Array.push method didn't work :( I commented out the html code too and deleted it before submetting, but I originally intended to add an input field on the page and a button; the button will get the enemy number from the input and make enemies based on that number. sort of choosing the defficulity of the game you know?
//may be because the game is already loaded so I can't choose the enemy number beforehand
//commented out codet because I couldn't get how to make it create the enemies based on a button and an input value I added and commented it out; 
//I hope you give some advice!
// if(int!==0){
// 	for (var i = 0; i<int ; i++){
// 		allEnemies.push(new Enemy());
// 	}
// }




var player = new Player();

player.pSelector();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
