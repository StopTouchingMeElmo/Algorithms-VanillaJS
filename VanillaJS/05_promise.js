//Promise. Методы then, catch, sleep, all, race
//Обертка над асинхронностью, которая добавляет удобство для написания кода

//Эмуляция работы с сервером через асинхронность и подход коллбэков
//setTimeout - метод, доступный нам из браузерного API, глобального объекта window
//Мы реализовали последовательную асинхронность с помощью коллбэков

/* console.log('Requesting data...');
setTimeout(() => {
    console.log('Preparing data...');

    const backendData = {
        server: 'aws',
        port: 2000,
        status: 'working'
    };

    setTimeout(() => {
        backendData.modified = true;
        console.log('Data recieved', backendData);
    }, 2000);
}, 2000); */

//Данный подход плох тем, что мы получаем большую вложенность. Большое кол-во коллбэков внутри коллбэков.
//Если бы было три запроса к серверу, полученные данные которых нужно было объединить и тд.
//Такой код сложно поддерживать.

//----------------------------------------------------------------------------------------------

//Promise нужны для упрощения работы с асинхронными операциями
//создаем instance (экземпляр) от глобального класса Promise, в конструктор которого мы должны передать
//коллбэк функцию, которая прнимает в себя два аргумента resolve, reject, которые, в свою очередь,
//тоже являются функциями.
//Внутри функции коллбэка, которую мы передали конструктору класса Promise мы пишем АСИНХРОННЫЙ КОД.

console.log('Requesting data...');
const p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log('Preparing data...');

        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        };
        resolve(backendData); //сообщаем промису, что он завершился, после чего вызывается метод then
    }, 2000); //чтобы метод then получил доступ к объекту внутри промиса, мы передаем этот объект в аргументе функции resolve
}); //и принимаем его в самом методе then

/* p.then((data) => { //Метод then(потом, после) применяется ПОСЛЕ вызова функции resolve
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data); //resolve необходимо записывать внутри коллбэк функции, а не вне её
        }, 2000);
    });

    p2.then((clientData) => {
        console.log('Data recieved', clientData);
    });
}); */

//----------------------------------------------------------------------------------------

//Более короткая запись без создания переменной p2:
/* p.then((data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data);
        }, 2000);
    });
}).then((clientData) => {
    console.log('Data recieved', clientData);
}); */

// Делать такую же запись, но с отступами, называется чейнить (chain-цепь)
// Запись цепочкой более наглядна и удобна
// !!! Не обязательно возвращать промисы в then, можно возвращать любые данные
// и последовательно их модифицировать.(1)
p
    .then((data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                data.modified = true;
                resolve(data);
            }, 2000);
        });
    })
    .then(clientData => {
        clientData.fromPromise = true;
        return clientData; //(1)
    })
    .then(prevThenData => {
        console.log('Data recieved', prevThenData);
    })
    .catch(err => console.log('Error:', err)) // Если reject, то Error: {server: "aws", port: 2000, status: "working", modified: true}
    .finally(() => console.log('Finally'))

//Requesting data...
//Preparing data...
//Data recieved {server: "aws", port: 2000, status: "working", modified: true, fromPromise: true}

//-------------------------------------------------------------------------------------

//Меняя местами resolve и reject мы можем сообщать об успехе или неуспехе Промиса,
//и методом catch отлавливать ошибки в любом месте.

//Метод finally будет вызван в любом случае, независимо от resolve или reject промиса.

//------------------------------------------------------------------------------------
//Методом sleep удобно пользоваться, в отличие от setTimeout'ов
//лаконичная и удобная запись:

const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });
};

/* sleep(2000).then(() => console.log('After 2 sec'))
sleep(3000).then(() => console.log('After 3 sec')) */

//-----------------------------------------------------------------------------------------
//У глобального класса Promise есть еще два метода all и race

// В метод all мы передаем массив промисов (или функций, возвращающих промисы)
// Метод all возвращает промис, который будет выполнен только тогда, когда завершатся все промисы в массиве
// Промисами в данном случае могут быть, например, запросы к серверу, когда нужно подождать набор данных,
// которые потом нужно скомбинировать. Часто применяется.

Promise.all([sleep(2000), sleep(10000)]).then(() => console.log('All promises are done'));

//По аналогии с методом all, метод race, наоборот, отрабатывает сразу после завершения первого (самого раннего) промиса в массиве.
//Бывает полезно, когда нужно определить, какой промис был первым выполнен
Promise.race([sleep(2000), sleep(10000)]).then(() => console.log('Race Earliest promise is done'));