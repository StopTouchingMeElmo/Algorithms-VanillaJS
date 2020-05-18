// Взаимодействие с сервером через асинхронные запросы, используя нативный JS без библиотек.
// 14_Запросы на сервер.  XMLHttpRequest (XHR)

// Настраиваем запрос
// Передаем ему строку url
// В фоновом режиме запрос будет уходить
// Ловим ответ с сервера

const requestURL = 'https://jsonplaceholder.typicode.com/users' //[0]

// Создаем инстенс класса XHR
const xhr = new XMLHttpRequest() //[1]

// метод open откроет нам новое соединение, в него мы передаем метод, по которому будем делть запрос:
// (GET получение данных, POST создание данных, PUT полное обновление элемента, PATCH частичное обновление элемента, DELETE)
xhr.open('GET', requestURL) //[2]

//[4.1]
// напрямую указать объекту XHR, что нужно распарсить ответ.
xhr.responseType = 'json'
xhr.onload = () => {
    if (xhr.status >= 400) { //[5.1] в случае, когда сервер отвечает без ошибки, но при этом несет статус код, что произошла ошибка,
        // например, такой пользователь не найден в б/д. В таком случае мы не будем попадать в onerror (тип Network ошибки)
        console.error(xhr.response)
    } else {
        console.log(xhr.response)
    }
}

//[4]
// для взаимодействия с данными, перед отправкой запроса, добавим слушателя:
// xhr.onload = () => console.log(xhr.response) // получаем данные в виде строки формата json
// xhr.onload = () => console.log(JSON.parse(xhr.response)) // парсим строки в объект >> (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

// для обработки ошибок. При успехе попадаем в onload, при ошибке в onerror
xhr.onerror = () => console.log(xhr.response) //[5]

// отправляем сформированный запрос методом send
// Вкладка Network в браузере говорит нам, какие сетевые запросы уходят в фоновом режиме
// Выбрав фильтр XHR мы увидим информацию о запросе:
// Headers:General info, Response Headers, Request Headers;
// Response - реальный ответ сервера;
// Preview - ответ, распарсеный браузером.
xhr.send() //[3]
//==========================================================================================

// Для работы с асинхронным кодом (данный код явл-ся асинхронным, т.к. мы отправляем данные на сервер и ждем данных в ответ),
// а также для универсальной передачи запросов любого типа -
// обернем наш код в универсальную функцию, которая будет возвращать Promise.
// По сути мы создадим универсальный метод, аналоги которго можно увидеть в библиотеках, типа JQuery
function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr2 = new XMLHttpRequest() //[1]
        xhr2.open(method, url) //[2]
        xhr2.responseType = 'json' //[4.1]
        xhr2.onload = () => { //[4]
            if (xhr2.status >= 400) { //[5.1]
                reject(xhr2.response)
            } else {
                console.log('Promise response')
                resolve(xhr2.response)
            }
        }
        xhr2.onerror = () => reject(xhr2.response) //[5]
        xhr2.send() //[3]
    })
}
sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))
//=====================================================================================================
// Для работы с методом POST потребуется дополнить код нашего метода.*
// Метод POST должен принимать дополнительные параметры body - то, с чем отправляется запрос.
// Телом запроса являются объекты.

const user = {
    name: 'Steve',
    age: 30
}

function sendRequest2(method, url, body) { //* Дополним третьим параметром тела запроса POST
    return new Promise((resolve, reject) => {
        const xhr2 = new XMLHttpRequest() //[1]
        xhr2.open(method, url) //[2]
        xhr2.responseType = 'json' //[4.1]
        xhr2.setRequestHeader('Content-Type', 'application/json') //* Изменить Header нашего запроса с дефолтного text на application/json,
        // чтобы сервер понял, данные какого формата получил, спарсил полученный json string и отдал нам информацию о переданном объекте в виде полноценного объекта.
        xhr2.onload = () => { //[4]
            if (xhr2.status >= 400) { //[5.1]
                reject(xhr2.response)
            } else {
                console.log('Promise response')
                resolve(xhr2.response)
            }
        }
        xhr2.onerror = () => reject(xhr2.response) //[5]
        xhr2.send(JSON.stringify(body)) //[3] //* Также необходимо превратить отправляемый объект в JSON string
    })
}
sendRequest2('POST', requestURL, user)
    .then(data => console.log(data))
    .catch(err => console.log(err));

//Res:
//Promise response
//{name: "Steve", age: 30, id: 11} // Ответ от сервера о созданном объекте с присвоенным сервером id.

// От браузера: объект в json string с Заголовком json
// Сервер: парсит в объект
// От сервера: объект в json string
// Браузер: парсит в объект.