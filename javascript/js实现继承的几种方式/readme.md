JS作为面向对象的弱类型语言，继承也是其非常强大的特性之一。

##JS继承的实现方式

-----

既然要实现继承，那么首先我们得有一个父类，代码如下：

```angular2html
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

```

### 1、原型链继承
**核心**：将父类的实例作为子类的原型
```angular2html
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
```
特点：
- 1.纯粹的继承关系，实例是子类的实例，也是父类的实例
- 2.父类新增方法属性，子类都能访问到
- 3.简单易于实现

缺点：
- 1.可以在Cat构造函数中，为Cat实例增加实例属性。如果要新增原型属性和方法，则必须放在`Cat.prototype = new Animal();`这样的语句之后执行。
- 2.无法实现多继承
- 3.来自原型对象的引用属性是所有实例共享的
- 4.创建子类的实例时，无法向父类构造函数传参

### 2.构造函数继承（使用call）
核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
```angular2html
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
```
特点：
- 1.解决了1中，子类实例共享父类引用属性的问题
- 2.创建子类实例时，可以向父类传递参数
- 3.可以实现多继承（call多个父类对象）

缺点：
- 1.实例并不是父类的实例，只是子类的实例
- 2.只能继承父类的实例属性和方法，不能继承原型属性/方法
- 3.无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

### 3.实例继承
---
核心：为父类实例添加新特性，作为子类实例返回
```angular2html
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
```

特点：
- 1.不限制调用方式，不管是 `new 子类()` 还是 `子类()`，返回的对象具有相同的效果

缺点：
- 1.实例是父类的实例，不是子类的实例
- 2.不支持多继承

### 4.拷贝继承
```angular2html
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
```

特点：
- 支持多继承

缺点：
- 1.效率较低，占用内存高
- 2.无法获取父类不可枚举的方法（不可枚举方法，不能使用for-in访问到）

### 5.组合继承
核心：通过调用父类构造函数，继承父类的属性并表流传参的优点，然后通过将父类实例作为子类原型，实现函数复用
```angular2html
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
```

特点：
- 1.弥补了方式二的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
- 2.即是子类的实例，也是父类的实例
- 3.不存在引用属性共享问题
- 4.可传参
- 5.函数可复用

缺点：
- 1.调用了两次父构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽掉了），消耗内存较少

### 6.寄生组合继承
核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
```angular2html
function Cat(name) {
    Animal.call(this);
    this.name = name || "Tom";
}
(function () {
    // 创建一个没有实例方法的类
    var Super = function () {
    }
    Super.prototype = Animal.prototype;
    // 将实例作为子类的原型
    Cat.prototype = new Super();
})();
// 修复构造函数
Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep();
cat.eat('bread');
console.log(cat instanceof Cat); //true
console.log(cat instanceof Animal); //true
```

特点：
- 1.堪称完美

缺点：
- 1.实现较为复杂