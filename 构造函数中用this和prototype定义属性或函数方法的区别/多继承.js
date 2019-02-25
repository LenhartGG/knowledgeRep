function Parent1(name,age){
    // this.name = name;
    // this.age = age;
    // this.height=180;
Parent1.prototype.say = function(){
    console.log('hi...');
}
}
function Parent2(name,age,weight){
    // this.name = name;
    // this.age = age;
    // this.weight = weight;
    // this.height = 170;
    // this.skin='yellow';
}
Parent2.prototype.walk = function(){
    console.log('walk...');
}

function Child(name,age,weight){
    // Parent1.call(this,name,age);
    // Parent2.call(this,name,age,weight);
    this.walk()
}

// for(var i in Parent1.prototype){Child.prototype[i] = Parent1.prototype[i]}
for(var i in Parent2.prototype){Child.prototype[i] = Parent2.prototype[i]}

var c1 = new Child('xiaoming',10,8);
// console.log(c1); //Child { name="xiaoming", age=10, height=170, 更多...}



// console.log(c1.constructor);//Child(name,age,weight)