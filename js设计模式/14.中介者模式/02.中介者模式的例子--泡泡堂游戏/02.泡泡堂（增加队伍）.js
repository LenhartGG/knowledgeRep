
var players = [];

function Player(name, teamColor){
    this.name = name;  //玩家名字
    this.enemies = [];  //敌人列表
    this.partners = [];  //队友列表
    this.state = 'live';  //玩家状态
    this.teamColor = teamColor;  //队伍颜色
}

Player.prototype.win = function(){  //玩家团队获胜
    console.log('winner: ' + this.name);
}

Player.prototype.lose = function(){  //玩家团队失败
    console.log('loser: ' + this.name);
}

Player.prototype.die = function(){  //玩家死亡
    
    var all_dead = true;
    this.state = 'dead';  //设置玩家状态为死亡

    for(var i = 0, partner; partner = this.partners[ i ++ ]; ){ //遍历玩家列表
        if( partner.state !== 'dead' ){ //只要一个队友没有死亡，则游戏还未失败
            all_dead = false;
        }
    }

    if( all_dead === true ){ //如果队友全部死亡
        this.lose();
        for( var i = 0, partner; partner = this.partners[ i++ ]; ){
            partner.lose();
        }
        for( var i = 0, enemy; enemy = this.enemies[ i++ ]; ){
            enemy.win();
        }
    }
}

// 最后定义一个工厂来创建玩家
var playerFactory = function( name, teamColor ){
    var newPlayer = new Player( name, teamColor );  //创建新玩家

    for( var i = 0, player; player = players[ i++ ]; ){
        if( player.teamColor === newPlayer.teamColor ){
            player.partners.push( newPlayer );
            newPlayer.partners.push( player );
        }else{
            player.enemies.push( newPlayer );
            newPlayer.enemies.push( player );
        }
    }
    players.push( newPlayer );

    return newPlayer;
}

// EDG
var player1 =  playerFactory( 'clearlove', 'EDG' )
var player2 =  playerFactory( 'iboy', 'EDG' )
var player3 =  playerFactory( 'haro', 'EDG' )
var player4 =  playerFactory( 'meiko', 'EDG' )
var player5 =  playerFactory( 'ray', 'EDG' )
// RNG
var player6 =  playerFactory( 'uzi', 'RNG' )
var player7 =  playerFactory( 'ming', 'RNG' )
var player8 =  playerFactory( 'mlxg', 'RNG' )
var player9 =  playerFactory( 'karse', 'RNG' )
var player10 =  playerFactory( 'xiaohu', 'RNG' )

// 让RNG战队全部死亡
player6.die();
player7.die();
player8.die();
player9.die();
player10.die();