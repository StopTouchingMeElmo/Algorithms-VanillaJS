// 17_LocalStorage
// Локальное хранилище в браузере, где можно хранить любые данные, которые будут доступны после перезагрузки страницы.
// Импровизировання база данных браузера.
// Обычно около 5 Мегабайт.

// API
// Важно! LS есть тольков в брузере. В nodejs LS нет.
// LS работает ТОЛЬКО со строками. (!)
//window.localStorage

const myNum = 22

localStorage.setItem('number', myNum.toString()) // ключ, значение(приведенное к строке)
localStorage.getItem('number') //"22"
localStorage.removeItem('number')
localStorage.clear()


// для просмотра содержимого LS: Dev tools->Application->LS

const obj = {
    name: 'Steve',
    age: 55
}

localStorage.setItem('person', JSON.stringify(obj))

const strObj = localStorage.getItem('person')
strObj
//"{"name":"Steve","age":55}"

const objParsed = JSON.parse(strObj)
objParsed
//{name: "Steve", age: 55}
//=================================================================================

// Если приложение открыто в разных вкладках, то мы можем сделать синхронизацию
// с помощью событий, которые могут прослушивать объект window для LS:
// window.onstorage = () => {} // или
window.addEventListener('storage', event => {
    console.log(event)
})
// Предположим, наше приложение открыто в нескольких окнах. При наступлении к-либо события для LS в одном из окон,
// в остальных окнах будет отработана функция слушателя.
localStorage.setItem('newEvent', Date.now()) // Создаем событие для LS в одном окне
//StorageEvent {isTrusted: true, key: "newEvent", oldValue: null, newValue: "1590709841117", // функция слуштеля отрабатывает во всех остальных открытых окнах с приложением
//url: "file:///G:/index.html", …}

// LS, в отличие от cookie, не улетает с запросами на сервер.