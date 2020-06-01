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
    const animation_hide = 400
    let closing = false // добавляем защиту на случай вызова функции open во время выполнения функции close

    return {
        open() {
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide') // для создания анимации при закрытии окна
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, animation_hide)
        },
        destroy() {}
    }
}

/* реализовать объект options:
1. title:string
передать в м.о. title и он применяется для элемента м.о. html
2. параметр closable:boolean*
если true, то  <span class="modal-close">&times;</span>, если false, то этого элемента нет
3. параметр content:string
к-то динамический контент в формате html, наполнения м.о.
4. параметр width:string ('400px')
отвечает за ширину м.о.
5. метод destroy(): возвращает void
должен убирать из дом дерева м.о. const $modal = _createModal(options),
а также удалять всех слушателей, которые являются частью м.о
6. при нажатии на крестик м.о. должно закрываться
7. при нажатии на фон(overlay) тоже должно закрываться
===========================================================================
8. создать публичный метод (т.е. доступный для экземпляра наряду с open,close и т д.)
setContent(принимает html:string): возвращает ничего void) // PUBLIC
вызывая данный метод и передавая в него  html динамически будет меняться содержимое м.о.
9. хук onClose():void, который вызывается, когда м.о. закрыто
10. хук onOpen():void
11. хук beforeClose(): уже возвращает boolean (true или false)
    true - м.о. можно закрыть
    false - м.о. не закрывается
==============================================================================
animate.css
добавить любые свойства для инициализации нашего плагина*/