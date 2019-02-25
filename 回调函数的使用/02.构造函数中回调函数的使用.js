// 第一种，外部函数回调调用
function MyConstructor1(){
    this.dataRetriever = function(callback){

        var res = 'lenhart'

        callback.call(this, res)
    }
}

function mySuccessFunction(content){
    console.log('mySuccessFunction: ' + content)
}
var my1 = new MyConstructor1()
    my1.dataRetriever(mySuccessFunction)

// 第二种 ：构造函数内部调用自己的方法
function MyConstructor2() {
    this.show = function(callback1, callback2){
        var name1 = "lenhartGG";
            name2 = 'Alice';
        callback1.call(this, name1)
        callback2.call(this, name2)
    },
    this.publicMethods = {
        public1:function  (a) {
            console.log('我要干的事:'+a+"->接下来写方法")
        },
        public2:function  (a) {
            console.log('我要干的事:'+a+"->接下来写方法")
        }
    }
}
var my2 = new MyConstructor2();
    my2.show(my2.publicMethods.public1, my2.publicMethods.public2)

// 第三种：构造函数内或者外定义公用大F的链式叠加，然后new 实例化进行调用
//第三种：构造函数内或者外定义公用大F的链式叠加，然后new 实例化进行调用
function MyConstructor3() {

    this.show = function  (callback) {
        var a = '做事需要的参数';


        publicMethods.public1(a);
        callback?callback.call(this,a):null
        return this;//进行链式调用
    };
    this.addEvent = function  () {

        //addEvent内部需要使用公用方法1，进行调用传入参数
        var a = '我是方法1'
        publicMethods.public2(a);
        return this;//进行链式调用
    };
//-->   此段容如果放到 构造函数 外面，其实可以作为回调函数用的，参考第一种但是个人考虑公用F的污染的问题，还是放到 构造函数内
    //定义公用大F的链式叠加添加方法函数
    Function.prototype.addMthod = function (name,fn) {
        this.prototype[name] = fn;
        return this; //进行链式添加
    }
    //定义方法函数进行添加
    var AddMethods = function(){};
    AddMethods.addMthod('public1',function  (a) {
        console.log('公用函数1要做的事'+a)
        return this; //进行链式调用，但是如果有参数进行操作的话，是不能返回当前this的
    }).addMthod('public2',function (a) {
        console.log('公用函数2要做的事'+a)
        return this; //进行链式调用，但是如果有参数进行操作的话，是不能返回当前this的
    })
    //进行调用
    var publicMethods = new AddMethods();
    /* 注释1
     *  publicMethods.public1().public2()
    */
//-->           
}
    //当实例化成功后，(注释1)中内部的公用方法就实现了调用，但是这些方法是要在构造函数内部调用的，所以不需要直接调用
    var my3 = new MyConstructor3();
    my3.show().addEvent() //打印结果：公用函数1要做的事做事需要的参数；公用函数2要做的事
