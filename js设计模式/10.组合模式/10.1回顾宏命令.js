
var MacroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command);
        },
        excute: function () {
            for (var i = 0, command; command = this.commandList[i++];) {
                command.excute();
            }
        },
        printCommand: function(){
            console.log(this.commandList);
        }
    }
}

var openAcCommand = {
    excute: function(){
        console.log("打开空调");
    }
}
var openTvCommand = {
    excute: function(){
        console.log("打开电视");
    }
}
var openSoundCommand = {
    excute: function(){
        console.log("打开音响");
    }
}
var macroCommand1 = MacroCommand();
macroCommand1.add(openAcCommand);
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);


var closeDoorCommand = {
    excute: function () {
        console.log("关门");
    }
}
var openPcCommand = {
    excute: function () {
        console.log("打开电脑");
    }
}
var openQQCommand = {
    excute: function () {
        console.log("登录QQ");
    }
}
var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

var macrocommand = MacroCommand();
macrocommand.add(macroCommand1);
macrocommand.add(macroCommand2);
