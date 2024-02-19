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

// const fruits = ["mango", "banana", "grapes", "orange", "guava"];
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

// -----prototyping-----
// const r = fruits.myFilter(function(elm){return elm.includes('n')})
// console.log(r)
// const myObj1 = {
//     fun2:function(){console.log(this.a)}
// }
// const myObj2 = {
//     a:"hey",
//     fun:function () {console.log(this.a)}
// }
// function myfun(){
//     this.a = "hey"
// }
// myObj1.__proto__ = myObj2

// console.log(myObj1.fun2())

// -------call apply bind-------
//? The call(), apply() and bind() are the methods of Function instances that calls this function with a given this value and arguments provided individually, as an array and a given sequence of arguments preceding any provided when the new function is called respectively.

// const obj1 = {
//     fun1:function(x=0){return this.fun2(x)}
// }

// function outf(){
//     console.log(this.a)
// }

// const obj2 = {
//     fun2:function(x){return this.a+this.b+x},
//     a:3,
//     b:5
// }

// // obj1.__proto__ = obj2

// x = obj1.fun1.apply(obj2, [10])
// y = obj1.fun1.call(obj2, 5)
// z = obj1.fun1.bind(obj2)

// console.log(x, y, z(5))

// const obj={
//     a : 5,
//     __proto__:{
//         b:3,
//         c:function(){return 'pro'},
//         __proto__:{
//             d:8,
//             __proto__:{
//                 e:function(){return this.a+this.b+this.d}
//             }
//         }
//     }
// }
// const arr = [3, 2, 5, 6, 4];
// console.log(typeof arr)
// arr.__proto__ = {myfilter:function (checkfilter) {
//     const fil = []
//     for (let num of Array.from(this)) {
//         if (checkfilter(num)) {
//         fil.push(num)
//         }
//     }
//     return fil
// }}

// console.log(
//   arr.myfilter((elm) => {
//     console.log(elm)
//     if (elm % 2 === 0) {
//       return true;
//     } else {
//       return false;
//     }
//   })
// );


// function mainCallbakc(){

// }

// class A{
//     constructor(k){
//         this.name = 'hulululu'
//         this.k = k
//     }
//     getN(){
//         return this.k + this.name + getM()
//     }
// }

// function B(){
//     this.name1 = 'halalala'
// }
// getM = function(key){
//     return this[key].length
// }

// const obj = {
//     n:'123',
//     fn:function(){return this.k}
// }


// const arr = [3,3,4,4,4,5]

// function getFrequencies(arr){
//     const result = {};
//     for(let i=0; i<arr.length;i++){
//         if(result.hasOwnProperty(`${arr[i]}`)){
//             result[`${arr[i]}`]+=1
//         }else{
//             result[`${arr[i]}`] = 1
//         }
//     }
//     return result
// }

// function getFreq(arr){
//     const obj = {}
//     let count = 1
//     for(let i=0; i<arr.length; i++){
//         if(obj.hasOwnProperty(`${arr[i]}`)) continue;
        
//         for(let j=i+1; j<arr.length; j++){
//             if(arr[i] === arr[j]){
//                 count +=1
//             }
//         }
//         obj[`${arr[i]}`] = count
//     }
//     return obj
// }
// console.log(getFreq(arr))

// const res = arr.reduce((acc, curr)=>{
//     if(acc.hasOwnProperty(`${curr}`)){
//         acc[`${curr}`] += 1;
//     }else{
//         acc[`${curr}`] = 1;
//     }
//     return acc
// }, {})
// console.log(getFrequencies(arr))
// console.log(res)

// const obj1 = {
//     a:20,
//     x:function(){
//         console.log(this.a)
//     }
// }

// function fn(){
//     console.log(this.a)
// }

// const obj2 = {
//     a:30
// }

