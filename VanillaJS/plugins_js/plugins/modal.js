// Как праметр мы будем получать объект с опциями, которые будут настраивать будущее модальное окно
// В качестве результата, при вызове плагина, мы хотим получить экземпляр модального окна
// с которым мы можем производить манипуляции типа: открыть, закрыть, изменить контент, уничтожить модальное окно.
// метод $.modal должен нам вернуть объект, где будут храниться методы, позволяющие взаимодействовать с экземпляром м.окна.

// Можно реализовать м.о. через класс, но плюс нашего подхода в том, что мы используем замыкания,
// а значит нам доступны приватные переменные.

// Метод destroy очень важен для плагинов, чтобы избежать утечек памяти.
// Хорошей практикой является создание анимации через css, а не через js, т.к. такой путь менее затратен.

// Переносим наше html окно в системную функцию, создающую экземпляр м.о.:
function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('wmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">Modal window</span>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <p>Lorem ipsum dolor sit.</p>
                <p>Lorem ipsum dolor sit.</p>
            </div>
            <div class="modal-footer">
                <button>Ok</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
`)
    document.body.appendChild(modal)
    return modal
}

$.modal = function (options) {
    const $modal = _createModal(options) // динамически создаем экземпляр м.о
    return {
        open() {
            $modal.classList.add('open')
        },
        close() {
            $modal.classList.remove('open')
        },
        destroy() {}
    }
}