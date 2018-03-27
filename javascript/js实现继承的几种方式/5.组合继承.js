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


// 5.组合继承
// 核心：通过调用父类构造函数，继承父类的属性并表流传参的优点，然后通过将父类实例作为子类原型，实现函数复用
function Cat(name) {
    Animal.call(this);
    this.name = name || "Tom";
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep();
cat.eat('bread');
console.log(cat instanceof Cat); //true
console.log(cat instanceof Animal); //true

// 特点：
//  1.弥补了方式二的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
//  2.即是子类的实例，也是父类的实例
//  3.不存在引用属性共享问题
//  4.可传参
//  5.函数可复用
// 缺点：
//  1.调用了两次父构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽掉了），消耗内存较少