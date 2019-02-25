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


// 4.拷贝继承
function Cat(name) {
    var animal = new Animal();
    for (var p in animal) {
        Cat.prototype[p] = animal[p];
    }
    Cat.prototype.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep();
cat.eat('bread');
console.log(cat instanceof Cat); //true
console.log(cat instanceof Animal); //false

// 特点：支持多继承
// 缺点：1.效率较低，占用内存高
//      2.无法获取父类不可枚举的方法（不可枚举方法，不能使用for-in访问到）