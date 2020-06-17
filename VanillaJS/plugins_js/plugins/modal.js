// Как праметр мы будем получать объект с опциями, которые будут настраивать будущее модальное окно
// В качестве результата, при вызове плагина, мы хотим получить экземпляр модального окна
// с которым мы можем производить манипуляции типа: открыть, закрыть, изменить контент, уничтожить модальное окно.
// метод $.modal должен нам вернуть объект, где будут храниться методы, позволяющие взаимодействовать с экземпляром м.окна.

// Можно реализовать м.о. через класс, но плюс нашего подхода в том, что мы используем замыкания,
// а значит нам доступны приватные переменные.

// Метод destroy очень важен для плагинов, чтобы избежать утечек памяти.
// Хорошей практикой является создание анимации через css, а не через js, т.к. такой путь менее затратен.

//(4)Создаем метод в прототипе, который будет добавлять элемент (наш футер) в нужное местов DOM дереве.
// По дефолту такого метода не существует.
Element.prototype.addElementAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function fake() {} //пустая функция для кнопок на случай отсутствия handler в объекте options
const fakeData = ''
//(3) Создаем системную функцию, создающую футер с кнопками:
function _createModalFooter(arrButtons = []) {
    if (arrButtons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    arrButtons.forEach(el => {
        let $btn = document.createElement('button')
        $btn.textContent = el.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${el.type || 'secondary'}`)
        $btn.dataset[el.data] = true || fakeData
        /* $btn.onclick = el.handler || fake */

        wrap.appendChild($btn)
    })

    return wrap
}

//(2) Переносим наше html окно в системную функцию, создающую экземпляр м.о.:
function _createModal(options) {
    const default_width = '600px'
    const modal = document.createElement('div')
    modal.classList.add('wmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-mmm="true">
        <div class="modal-window" style="width: ${options.width || default_width};">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'No title yet'}</span>
                ${options.closable ? `<span class="modal-close" data-mmm="true">&times;</span>`:''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
           
        </div>
    </div>
`)
    const footer = _createModalFooter(options.footerBtns)
    const bodyEl = modal.querySelector('[data-content]') // элемент-ориентир, после которого будет добавлен наш футер
    footer.addElementAfter(bodyEl) //(4)
    document.body.appendChild(modal)
    return modal
}

//(1) Наш плагин модального окна
$.modal = function (options) {
    const $modal = _createModal(options) // динамически создаем экземпляр м.о
    const animation_hide = 400
    let closing = false // добавляем защиту на случай вызова функции open во время выполнения функции close
    let destroyed = false

    const methObj = {
        open() {
            if (destroyed) {
                console.log('Modal window is destroyed')
            }!closing && $modal.classList.add('open')

            methObj.onOpen = function () {} //10 хук
            delete methObj.onClose
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide') // для создания анимации при закрытии окна
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, animation_hide)

            methObj.onClose = function () {} //9 хук
            delete methObj.onOpen
        },
        onClose() {} //9 дефолтное состояние хука onClose

        /* destroy() { // 5 для удобства использования метод перенесен расширением через Object.assign в return
            $modal.parentNode.removeChild($modal)
        } */

    }

    //через атрибут dataset
    /* $modal.addEventListener('click', event => {
        console.log('Clicked', event.target.dataset.mmm) // выносим функцию event в замыкание в отдельную переменную, 
        if (event.target.dataset.mmm) methObj.close() // чтобы в методе destroy удалить слушателя для предотвращения утечки пмяти*
    }) */
    let listener = event => {
        console.log('Clicked', event.target.dataset.mmm)
        if (event.target.dataset.mmm) methObj.close()
    }
    $modal.addEventListener('click', listener)

    //через селекторы

    /* let title = $modal.querySelector('.modal-title').textContent = options.title // 1 */

    /* $modal.querySelector('.modal-close').id = 'mClose' // 2
    let modalClose = document.getElementById('mClose');
    !(options.closable) && modalClose.parentNode.removeChild(modalClose) */

    /*  $modal.querySelector('.modal-body').insertAdjacentHTML('afterbegin', options.content) //3 */

    /*  $modal.querySelector('.modal-window').style.width = options.width // 4 */

    /* $modal.querySelector('.modal-close').id = 'mClose'
    document.getElementById('mClose').addEventListener('click', event => {
        methObj.close()
    }) // 6
    $modal.querySelector('.modal-overlay').addEventListener('click', event => {
        methObj.close()
    }) // 7 */


    return Object.assign(methObj, {
        destroy() { // 5
            $modal.parentNode.removeChild($modal) //удаление элемента из DOM дерева
            destroyed = true
            $modal.removeEventListener('click', listener) //*
        },
        setContent(html) { //8
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })

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

//-------------------------------------------------------------------------------------
/*1. Динамически на основе массива вывести спиок карточек 
2. При нажатии на кнопку Price должна вызываться модалка, показывающая цену для яблок.
На модалке одна кнопка Ок.
3. Модалка для удаления с двумя кнопками.(да удалить и отмена)
При нажатии на Да Удалить динамически удаляется карточка из дом дерева.
На основе плагина $.modal нужно сделать другой плагин $.confirm(Promise)
*/

$.confirm = function (options) {
    const $confirm = _createModal(options) // динамически создаем экземпляр м.о
    const animation_hide = 400
    let closing = false // добавляем защиту на случай вызова функции open во время выполнения функции close
    let destroyed = false

    const methObj = {
        open() {
            if (destroyed) {
                console.log('Modal window is destroyed')
            }!closing && $confirm.classList.add('open')

            methObj.onOpen = function () {} //10 хук
            delete methObj.onClose
        },
        close() {
            closing = true
            $confirm.classList.remove('open')
            $confirm.classList.add('hide') // для создания анимации при закрытии окна
            setTimeout(() => {
                $confirm.classList.remove('hide')
                closing = false
            }, animation_hide)

            methObj.onClose = function () {} //9 хук
            delete methObj.onOpen
        },
        onClose() {} //9 дефолтное состояние хука onClose

    }

    let listener = event => {
        console.log('Clicked', event.target.dataset.mmm)
        if (event.target.dataset.mmm) methObj.close()
        console.log('Clicked', event.target.dataset.ddd)
        if (event.target.dataset.ddd) {
            options.delEl()
            methObj.close()
        }
    }
    $confirm.addEventListener('click', listener)

    return Object.assign(methObj, {
        destroy() { // 5
            $confirm.parentNode.removeChild($confirm) //удаление элемента из DOM дерева
            destroyed = true
            $confirm.removeEventListener('click', listener) //*
        },
        setContent(html) { //8
            $confirm.querySelector('[data-content]').innerHTML = html
        }
    })
}

// 1. Динамически на основе массива выводим список карточек.
function _createCardsList(fruits) {
    const default_height = '250px'
    const cards = document.createElement('div')
    cards.classList.add('row')
    for (let el of fruits) {
        cards.insertAdjacentHTML('afterbegin', `<div class="col" id="${el.id}">
        <div class="card">
            <img class="card-img-top" style="height: ${default_height};"
                src=${el.img}>
            <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <button class="btn btn-primary" data-fruits>Show price</button>
                <button class="btn btn-danger" data-del>Delete</button>
            </div>
        </div>
    </div>`)
        let bttn = cards.querySelector('[data-fruits]')
        bttn.onclick = el.showPrice
        let bttnDel = cards.querySelector('[data-del]')
        bttnDel.onclick = el.del
    }


    const container = document.querySelector('.container')
    container.appendChild(cards)

    return cards
}