// 2.2 对于更加复杂的场景来说，我们需要只能 fire 一次，以后即使调用了 fire ，也不再生效了。
function Callbacks(options) {
    var once = options = "once";
    var list = [];
    return {
        add: function(fn) {
            if(list){
                list.push(fn);
            }
        },
        remove: function(fn) {
            if(list){
                var position = list.indexOf(fn);
                if (position>=0) {
                    list.splice(position, 1);
                }
            }
        },
        fire: function(args) {
            if(list){
                for(var i=0; i<list.length; i++){
                    var fn = list[i];
                    fn(args);
                }
            }
            if(once){
                list = undefined;
            }
        }
    }
}


// 测试代码如下：
function fn1(args) {
    console.log("fn1: " + args);
}
function fn2(args) {
    console.log("fn2: " + args);
}

var callbacks = Callbacks();
callbacks.add(fn1);
console.log(Callbacks.list)
callbacks.fire("Alice");

callbacks.add(fn2);
callbacks.fire("Tom");

callbacks.remove(fn1);
callbacks.fire("Grace");