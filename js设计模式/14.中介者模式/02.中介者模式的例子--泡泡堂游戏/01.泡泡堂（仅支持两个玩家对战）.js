// 定义一个玩家构造函数，它有3个简单的原型方法：
// Play.prototype.win、Play.prototype.lose以及表示玩家死亡的Play.prototype.die
function Player(name){
    this.name = name;
    this.enemy = null;  //敌人
}

Player.prototype.win = function(){
    console.log(this.name + ' won');
}

Player.prototype.lose = function(){
    console.log(this.name + ' lost');
}

Player.prototype.die = function(){
    this.lose();
    this.enemy.win();
}

// 接下来创建两个玩家：
var player1 = new Player('uzi');
var player2 = new Player('jackey');

// 给玩家相互设置敌人
player1.enemy = player2;
player2.enemy = player1;

player1.die();