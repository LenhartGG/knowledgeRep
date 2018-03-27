/**
 * Created by Administrator on 2018/3/24 0024.
 */
function Person(name, age, isMarry) {
    this.name = name;
    this.age = age;
    this.isMarry = isMarry;
}
Person.prototype.printInfo = function () {
    console.log(this.name + this.age + this.isMarry);
};

// 上面的语句可以使用ES6简写为：
class Book {
    constructor (title, pages, isPublish) {
        this.title = title;
        this.pages = pages;
        this.isPublish = function () {
            if (isPublish) {
                return '已经出版了。'
            } else {
                return '未出版。'
            }
        };
    }
    printBookInfo() {
        console.log(this.title + '共' + this.pages + '页，' + this.isPublish());
    }
}

let book = new Book();
book.title = "《公牛历险记》";
book.pages = 200;
book.printBookInfo();

// 1.继承
// 除了新的声明类的方式，类的继承也有简化的语法。
class ITBook extends Book {
    constructor (title, pages, isPublish, technology) {
        super(title, pages, isPublish);
        this.technology = technology;
    }
    printTechnology() {
        this.technology;
    }
}

let jsBook = new ITBook('学习JavaScript算法', '200', true, 'javascript');
console.log(1, jsBook.title);
console.log(jsBook.isPublish());
jsBook.printBookInfo();
console.log(2, jsBook.printTechnology());
