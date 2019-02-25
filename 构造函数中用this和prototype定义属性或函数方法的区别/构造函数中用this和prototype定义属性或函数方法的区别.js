function Obj(){
    this.a=[]; //实例变量
    this.fn=function(){ //实例方法
        console.log(123)
    }
}
Person.prototype = new Obj()
function Person(name){

    // this.person = {
    //     wife: null,
    //     son:null
    // }
    Person.prototype.info = function(name){
        console.log(this)
        this.name = name
        return {name: name}
    }
    Person.prototype.share=[];
    this.fn()
    // return this.person
}
var p = new Person()
// var name = p.info('lenhart')
// console.log(name)