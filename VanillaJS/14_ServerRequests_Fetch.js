// Взаимодействие с сервером через асинхронные запросы, используя нативный JS без библиотек.
// 14_Запросы на сервер. Fetch.

// Достаточно новый, по сравнению с XMLHttpRequest, метод, доступный в браузерах.
// При этом метод XMLHttpRequest более универсальный и доступный абсолютно во всех браузерах.

// Перепишем наш метод sendRequest из 14_ServerRequests_XHR.js, но уже используя Fetch API:

const requestURL = 'https://jsonplaceholder.typicode.com/users' //[0]

// Метод fetch возвращает Promise
// По умолчанию метод fetch будет выполнять запрос GET
function sendRequest(method, url, body) {
    return fetch(url).then(response => response.json()) // response.json() парсим json и возвращаем промис
    //(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
}

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))

const user = {
    name: 'Steve',
    age: 30
}
//======================================================================

//POST
function sendRequest2(method, url, body) {
    return fetch(url, { //вторым аргументом передаем объект конфигурации тела
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) { // или response.status < 400
            return response.json()
        }
        return response.json() //обрабатываем и выбрасываем ошибку
            .then(error => {
                const e = new Error('Sorry, smthn gone wrong')
                e.data = error
                throw e
            })
    })
}

const headers = {
    'Content-Type': 'application/json'
}

sendRequest2('POST', requestURL, user)
    .then(data => console.log(data))
    .catch(err => console.log(err));
//Res:
//{name: "Steve", age: 30, id: 11}

//Библиотеки по типу JQuery построены на этих двух методах (XHR и Fetch), которые являются нативными для браузеров