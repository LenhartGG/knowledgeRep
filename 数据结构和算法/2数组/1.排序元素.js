/**
 * Created by lenhart on 2018/3/27 0027.
 */
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(numbers.reverse());
//[ 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
console.log(numbers);
//[ 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]

console.log(numbers.sort());
// [ 1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9 ]
numbers.sort(function (a, b) {
    return a - b;
});
console.log(numbers);

// 自定义排序
let friends