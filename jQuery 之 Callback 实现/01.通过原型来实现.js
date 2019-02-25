// 首先，实现一个类函数来表示这个回调类。在 javascript 中，使用数组来表示这个队列。
function Callbacks() {
    this.list = [];
}
// 然后，通过原型实现类中的方法。
// 增加和删除的函数都保存在数组中，fire 的时候，可以提供参数，这个参数将会被传递给每个回调函数。
Callbacks.prototype = {
    add: function(fn) {
        this.list.push(fn);
    },
    remove: function(fn){
        var position = this.list.indexOf(fn);
        if( position >=0){
            this.list.splice(position, 1);
        }
    },
    fire: function(args){
        for(var i=0; i<this.list.length; i++){
            var fn = this.list[i];
            fn(args);
        }
    }
};
// 测试代码如下：
function fn1(args){
    console.log("fn1: " + args);
}

function fn2(args){
    console.log("fn2: " + args);
}

var callbacks = new Callbacks();
callbacks.add(fn1);
callbacks.fire("Alice");

callbacks.add(fn2);
callbacks.fire("Tom");

callbacks.remove(fn1);
callbacks.fire("Grace");