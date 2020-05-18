// Взаимодействие с сервером через асинхронные запросы, используя нативный JS без библиотек.
// 14_Запросы на сервер. Fetch.

// Достаточно новый, по сравнению с XMLHttpRequest, метод, доступный в браузерах.
// При этом метод XMLHttpRequest более универсальный и доступный абсолютно во всех браузерах.

// Перепишем наш метод sendRequest из 14_ServerRequests_XHR.js, но уже используя Fetch API:

const requestURL = 'https://jsonplaceholder.typicode.com/users' //[0]

// Метод fetch возвращает Promise
// По умолчанию метод fetch будет выполнять запрос GET
function sendRequest(method, url, body) {
    return fetch(url).then(response => response.json())
}

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))

const user = {
    name: 'Steve',
    age: 30
}

/* sendRequest('POST', requestURL, user)
.then(data => console.log(data))
.catch(err => console.log(err)); */