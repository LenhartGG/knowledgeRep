/**
 * Created by Administrator on 2018/3/23 0023.
 */
// JS继承的实现方式
// 既然要继承，那么首先得有一个父类 Animal
function Animal(name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉。。。');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃' + food);;
}


// 3.实例继承
// 核心：为父类实例添加新特性，作为子类实例返回
function Cat3(name) {
    var instance = new Animal();
    instance.name = name || 'Tom';
    return instance;
}

// Test Code
var cat3 = new Cat3();
console.log(cat3.name);
cat3.sleep();
cat3.eat('meat');
console.log(cat3 instanceof Cat3); //false
console.log(cat3 instanceof Animal); //true

// 特点：不限制调用方式，不管是 `new 子类()` 还是 `子类()`，返回的对象具有相同的效果
// 缺点：1.实例是父类的实例，不是子类的实例
//      2.不支持多继承
