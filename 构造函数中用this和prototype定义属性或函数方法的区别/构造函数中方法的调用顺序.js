function Blizzard() {
    var myClass = Blizzard
    myClass.prototype.name = 'name';
    myClass.prototype.print = function(){
        console.log("32")
        // console.log("A blizzard with " +
        // this.kind + " M and Ms and " +
        // this.chunkSize + " chunks of cookie dough."
        // );
    }
    myClass.prototype._init = function(){
        this.print()
        console.log("12")
    }
    this._init()
}
var b = new Blizzard()