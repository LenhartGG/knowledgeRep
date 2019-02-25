## 2.1 call 和 apply 的区别
Function.prototype.call 和 Function.prototype.apply 都是非常常用的方法。他们的作用一模一样，区别仅在于传入参数形式的不同。

apply 接受两个参数，第一个参数制定了函数体内 this 对象的指向，第二个参数为为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply函数把这个集合中的元素作为参数传递到被调用的函数：
```
var func = function( a, b, c ){
    console.log( [a, b, c] ); //输出： [1, 2, 3]
};

func.apply(null, [1, 2, 3]);
```
在这段代码中，参数 1、2、3 被放在数组中一起传入 func 函数，他们分别对应 func 参数列表中的 a、b、c。

call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 的指向，从第二个参数往后，每个参数被一次传入函数：
```
var func = function( a, b, c ){
    console.log( [a, b, c] ); //输出： [1, 2, 3]
};

func.call(null, 1, 2, 3);
```
当调用一个函数时，JavaScript 的解释器不会计较形参和实参在数量、类型以及顺序上的区别，JavaScript 的参数在内部就是用一个数组来表示的。从这个意义上来说，apply 比 call 的使用率更高，因为不需要关心具体有多少参数被传入函数，只要 apply 一股脑的推进去就可以了。

当使用call或者apply时，如果我们传入的第一个参数为 null，函数体内的this会指向默认的宿主对象，在浏览器中则是 window：
```
var func = function( a, b, c ){
    alert(this === window); //输出：true
};

func.apply(null, [1, 2, 3]);

但如果在严格模式下，函数体内的this还是为 null：

var func = function( a, b, c ){
    'use strict'
    alert(this === null); //输出：true
};

func.apply(null, [1, 2, 3]);
```


## 2.2 call 和 aply 的用途
能够熟练使用 call 和 apply 是我们真正成为一名 JavaScript 程序员的重要一步，下面开始详细介绍 call 和 apply 在实际开发中的用途。

**1） 改变this的指向**
call 和 apply 最常见的的用途是改变函数内部 this 的指向，我么来看个例子：
```
var obj1 = {
    name: 'lenhart',
};

var obj2 = {
    name: 'monkey',
};

window.name = 'window';

var getName = function(){
    alert( this.name );
}

getName() //输出：'window'
getName.call( obj1 )    //输出：'lenhart'
getName.call( obj2 )    //输出：'monkey'
```

在实际开发中，经常会遇到 this 指向被不经意改变的场景，比如有一个di节点，div 节点的 onclick 事件中的 this，本来是指向这个 div 的：
```
document.getElementById( 'div1' ).onclick = function() {
    alert( this.id );   //输出：'div1'
}
```
假如该事件函数中有一个内部函数 func，在事件内部调用 func 函数时，func 函数体内的 this 就指向了 window，而不是我们预期的 div，见代码如下：
```
document.getElementById( 'div1' ).onclick = function() {
    alert( this.id );   //输出：'div1'
    var func = function(){
        alert(this.id); //输出： undefined
    }
    func()
}

这时候我们用 call 来修正 func 函数内的this，使其依然指向 div

document.getElementById( 'div1' ).onclick = function() {
    alert( this.id );   //输出：'div1'
    var func = function(){
        alert(this.id); //输出： undefined
    }
    func.call(this)
}

```