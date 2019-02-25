// function mask() {
    function VanillaSoftServe() {
        VanillaSoftServe.prototype._init = function () {
            console.log("mixing in Vanilla");

        }
    }
    function MandMs() {
        MandMs.prototype.kind = "plain"
        // kind: "plain"
    }
    function CookieDough() {
        this.chunkSize = "medium"
        // chunkSize: "medium"
    }
    
    // for (var i in MandMs.prototype) { Blizzard.prototype[i] = MandMs.prototype[i] }
    // for (var i in CookieDough.prototype) { Blizzard.prototype[i] = CookieDough.prototype[i] }
    // Blizzard.prototype = new VanillaSoftServe()
    function Blizzard() {
        this.name = 'name';
        this.print = function(){
            // console.log(this)
            // console.log("A blizzard with " +
            // this.kind + " M and Ms and " +
            // this.chunkSize + " chunks of cookie dough."
            // );
            this._init()
        }
        this.print()
    }
    for (var i in VanillaSoftServe.prototype) { Blizzard.prototype[i] = VanillaSoftServe.prototype[i] }
    var b = new Blizzard()
    // b._init()
// }