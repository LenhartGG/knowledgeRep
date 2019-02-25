// 或者，不使用原型，直接通过闭包来实现。
function Callbacks() {
    var list = [];
    return {
        add: function(fn) {
            list.push(fn);
        },
        remove: function(fn) {
            var position = list.indexOf(fn);
            if (position>=0) {
                list.splice(position, 1);
            }
        },
        fire: function(args) {
            for(var i=0; i<list.length; i++){
                var fn = list[i];
                fn(args);
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
callbacks.fire("Alice");

callbacks.add(fn2);
callbacks.fire("Tom");

callbacks.remove(fn1);
callbacks.fire("Grace");