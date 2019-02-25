var myclass = {
    number: 123,
    changeNum: function(num){
        this.number = num;
    },
    printNum: function(){
        console.log(this.number);
    },
    second: function(){
        this.printNum()
        this.changeNum(321)
        this.printNum()
    }
}
myclass.second();
