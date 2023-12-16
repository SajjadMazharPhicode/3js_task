// const url = 'https://api.github.com/users/SajjadMazhar';

// function getMyDetails(url, fun){
//     let data = []
//     if(url){
//         data = [{id:0, name:'sajjad'}, {id:1, name:'abhilash'}]
//     }
//     fun(data)
// }

// function getUserAccDetails(id, fun){
//     let data = [{id:0, ammount:2000}, {id:1, ammount:3000}]
//     fun(data.filter(el=> el.id===id)[0])
// }

// function getNameLength(name, fun){
//     fun(name.length);
// }

// getMyDetails(url, (data)=>{
//     let id = data[0].id
//     getUserAccDetails(id, (accDet)=>{
//         let detail = accDet
//         printMoney(detail, (len)=>{
//             console.log(len)
//         })
//     })
// })

// example for closure
// closure refers to a function bundled with whatever is in its outer environment
// const var1 = 'inside global context';

// function outer(){
//     const var2 = 'inside outer context';
//     function inner(){
//         const var3 = 'inside inner context';
//         console.log(var1)
//         console.log(var2)
//         console.log(var3)
//     }
//     return inner;
// }

// const innerFun = outer();
// innerFun()

// usecase of closures
//  1. setter getter object
// function styleSetter(){
//     const el = document.getElementById('mydiv');
//     if(el === null) return

//     function setColor(color){
//         el.style.backgroundColor = color;
//     }
//     function getColor(){
//         console.log(el.style.backgroundColor)
//     }
//     return {setColor, getColor}
// }

// const styleSetterObject = styleSetter();
// styleSetterObject.setColor('blue')
// styleSetterObject.getColor();

//  2. logger
// const serviceLogger = (function(){
//     const infoAlert = 'info';
//     const warningAlert = 'warning';
//     const errorAlert = 'error';

//     return {
//         info:function(str) {return `${infoAlert}: ${str}`},
//         warning:function(str) {return `${warningAlert}: ${str}`},
//         error:function(str) {return `${errorAlert}: ${str}`},
//     }
// })();
// console.log(serviceLogger.error('hi'))

//  3. rounder
// suppose we have an application where we need to use floating point numbers.
// for some piece of code we need 2 decimal placed value and for some we want 3 decimal value.

// function rounder(place){
//     return function (num){
//         return Number(num.toFixed(place))
//     }
// }

// const rounder2 = rounder(2)
// const rounder3 = rounder(3)

// console.log(rounder2(3.36452), rounder3(3.36452))

// private variables and functions using class
// class TestPrivacy{
//     constructor(str1, str2){
//         this.#private = str1 
//         this.public = str2
//     }
//     #private;
//     #privateMethod(){
//         console.log("i am private method")
//     }
//     getPrivateString(){
//         this.#privateMethod();
//         return this.#private;
//     }
// }
// const priv = new TestPrivacy('i am private', 'i am public')
// console.log(priv.getPrivateString())

// hidden variable using closure
// function updater(){
//     let init = 0;
//     return function(upVal){
//         if(upVal && typeof upVal === "number"){
//             init = upVal
//             return init
//         }
//         return init
//     }
// }

const fruits = ['mango', 'banana', 'grapes', 'orange', 'guava']
// const filterredFruits = fruits.filter(fruit=> fruit.includes("n"))
// // console.log(filterredFruits)
// function myFilter(data, condFun){
//     let temp = []
//     for(let elm of data){
//         if(condFun(elm)){
//             temp.push(elm)
//         }
//     }
//     return temp;
// }

// const newFilteredFruits = myFilter(fruits, (fruit)=> {
//     if(fruit.includes('n')){
//         return true;
//     }else{
//         return false;
//     }
// })
// console.log(filterredFruits, newFilteredFruits)

// altering prototype

// Array.prototype.myFilter = function(cb){
//     const temp = []
//     for(let elm of this){
//         cb(elm) && temp.push(elm);
//     }
//     return temp
// }

// const r = fruits.myFilter(function(elm){return elm.includes('n')})
// console.log(r)