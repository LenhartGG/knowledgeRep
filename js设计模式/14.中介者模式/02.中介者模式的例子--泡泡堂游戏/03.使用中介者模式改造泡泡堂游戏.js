// 把中介者对象命名为 playerDirector

function Player(name, teamColor){
    this.name = name;  //角色名字
    this.teamColor = teamColor;  //队伍颜色
    this.state = 'live';  //玩家生存状态
};

Player.prototype.win = function(){
    console.log(this.name + ' won');
};

Player.prototype.lose = function(){
    console.log(this.name + ' lost');
};

/******************玩家死亡*****************/
Player.prototype.die = function(){
    this.state = 'dead';
    playerDirector.ReceiveMessage( 'playerDead', this );    //给中介者发送消息，玩家死亡
};

/******************移除玩家*****************/
Player.prototype.remove = function(){
    playerDirector.ReceiveMessage( 'removePlayer', this );    //给中介者发送消息，移除一个玩家
};

/******************玩家换队*****************/
Player.prototype.changeTeam = function( color ){
    playerDirector.ReceiveMessage( 'changeTeam', this, color );    //给中介者发送消息，玩家换队
};

var playerFactory = function( name, teamColor ){
    var newPlayer = new Player( name, teamColor );   //创造一个新的玩家对象
    playerDirector.ReceiveMessage( 'addPlayer', newPlayer );    //给中介者发送消息，新增玩家
};

// 最后我们需要实现这个中介者 playerDirector 对象。
// playerDirector 开放一个对外暴露的接口 ReceiveMessage ，负责接收player对象发送的消息，
// 而player对象发送消息的时候总是把自身的 this 作为参数发送给 playerDirector ，以便 playerDirector 识别消息来自于哪个玩家对象，代码如下：

var playerDirector = (function(){
    var players = {};   //保存所有玩家
        operation = {};     //中介者可以执行的操作
    
    /******************新增一个玩家*****************/
    operation.addPlayer = function( player ){
        var teamColor = player.teamColor;   //玩家队伍的颜色
        players[ teamColor ] = players[ teamColor ] || [];  //如果该颜色的玩家还没有成立队伍，则新成立一个队伍
        players[ teamColor ].push( player );    //添加新玩家进队伍
    };
    
    /******************移除一个玩家*****************/
    operation.removePlayer = function( player ){
        var teamColor = player.teamColor;   //玩家的队伍颜色
            teamPlayers = players[ teamColor ] || [];   //该队的所有成员
        for( var i = teamPlayers.length - 1; i >= 0; i-- ){     //遍历删除
            if( teamPlayers[ i ] === player ){
                teamPlayers.splice( i, 1 );
            }
            
        }
    };

    /******************玩家换队*****************/
    operation.changeTeam = function( player, newTeamColor ){    //玩家换队
        operation.removePlayer( player );   //从原队伍中删除
        player.teamColor = newTeamColor;    //改变队伍颜色
        operation.addPlayer( player );      //增加到新队伍中
    };

    /******************玩家死亡*****************/
    operation.playerDead = function( player ){
        var teamColor = player.teamColor,
            teamPlayers = players[ teamColor ]; //玩家所在队伍
        
        var all_dead = true;

        for( var i = 0, player; player = teamPlayers[ i ]; i++ ){
            if( player.state !== 'dead' ){
                all_dead = false;
                break;
            }
        }

        if( all_dead === true ){  //全部死亡

            for( var i = 0, player; player = teamPlayers[ i ]; i++ ){
                player.lose();
            }

            for( color in players ){
                if( color !== teamColor ){
                    var teamPlayers = players[ color ]; //其他队伍的玩家
                    for( var i = 0, player; player = teamPlayers[ i ]; i++ ){
                        player.win();   //其他队伍所有玩家win
                    }
                }
            }
        }
    };

    var ReceiveMessage = function(){
        var message = Array.prototype.shift.call( arguments );  //arguments的第一个参数为消息名称
        operation[ message ].apply( this, arguments )
    }

    return {
        ReceiveMessage: ReceiveMessage
    }
})();
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