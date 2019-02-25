function main(callback)
{
    alert("I am main function");
    alert("Invoke callback function..");
    callback();
}
function b(){
    alert("I am callback function: b");
}
function c(){
    alert("I am callback function: c");
}
function test() {
    main(b);
    main(c);
}

test()