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


// 1.原型链继承
// 核心： 将父类的实例作为子类的原型
function Cat() {

}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.eat('fish');    //cat正在吃fish
cat.sleep();    //cat正在睡觉。。。
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat);    //true

// 2.构造函数继承（使用call方法）
// 核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
function Cat2(name) {
    Animal.call(this);
    this.name = name || 'Tom';
}
// Test Code
var cat2 = new Cat2();
console.log(cat2.name); //Tom
cat2.sleep()    //Tom正在睡觉。。。
console.log(cat2 instanceof Cat2); //true
console.log(cat2 instanceof Animal); //false

