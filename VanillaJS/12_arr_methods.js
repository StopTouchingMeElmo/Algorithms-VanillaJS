const people = [
    {name: 'Peter', age:'18', budget: 1000},
    {name: 'Veter', age:'19', budget: 2000},
    {name: 'Geter', age:'20', budget: 3000},
    {name: 'Beter', age:'21', budget: 4000},
    {name: 'Meter', age:'22', budget: 5000},
    {name: 'Jeter', age:'23', budget: 6000},
    {name: 'Ueter', age:'24', budget: 7000},
    {name: 'Weter', age:'25', budget: 8000},

];

/* for(let i=0; i<people.length; i++){
    console.log(people[i]);
} */

/* for (let person of people){
    console.log(person);
}; */

/* people.forEach((element,index,arr) => console.log(element,index,arr)); */

/* let newArr = people.map(x => x.budget * 2);
console.log(newArr); */

/* const twenty = [];
for (let i = 0; i < people.length; i++) {
    if (people[i].age >= 20)
    twenty.push(people[i]); 
}
console.log(twenty); */

/* console.log(people.filter(x=> x.age>= 22)); */

/* console.log(people.reduce((x,y)=> x + y.budget, 0)); */// 36000/ Проссумирует все бюджеты, x это prev элемент со значением 0; y это первый[0] элемент в массиве

/* const arr = [1,2,'a',3,4,5];
console.log(arr.filter(x => typeof(x) === 'number').reduce((x,y)=> x + y, 0));//15 */

