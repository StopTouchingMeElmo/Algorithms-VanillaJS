// Файл, отвечающий за само приложение,
// подключаем в index.html в самом конце

const options = {
    title: 'New Title text 5',
    closable: true,
    content: `<span>Lorem, <b>ipsum dolor sit amet consectetur adipisicing elit</b>.</span> 
    <p><b>Et cum ea dignissimos.</b></p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>`,
    width: '300px',
    footerBtns: [{
            text: 'Ok',
            type: 'primary',
            handler() {
                console.log('ok is clicked')
            }
        },
        {
            text: 'Cancel',
            type: 'danger',
            handler() {
                myModal.close()
            }
        }

    ]
}

// Наш экземпляр м.о., у которого уже есть методы родителя (modal.js)
const myModal = $.modal(options)
//===============================================================================================

// Создаем объект настроек для м.о. карточек(общий объект для м.о Price и Delete confirmation)
let optionsFruitsPrice = {
    /* title: 'gg',
    content: 'gg', */
    closable: true,
    width: '300px',
    footerBtns: [{
            text: 'Ok',
            type: 'primary',
            /* handler() {
                console.log('ok is clicked')
            } */
        },
        /* {
            text: 'Cancel',
            type: 'danger',
            handler() {

                fruitsModal.close()
            }
        } */

    ]
}

// Массив карточек
const fruits = [{
        id: 1,
        title: 'Apples',
        price: 20,
        img: 'https://thelunchlady.ca/wp-content/uploads/2015/10/Apples-in-your-diet.jpg',

    },
    {
        id: 2,
        title: 'Oranges',
        price: 25,
        img: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Orange-Whole-%26-Split.jpg',

    },
    {
        id: 3,
        title: 'Mango',
        price: 30,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/1200px-Mango_and_cross_section_edit.jpg',

    }
]

fruits.forEach((el, ind) => {
    el.showPrice = function () {
        optionsFruitsPrice.footerBtns.length = 1
        optionsFruitsPrice.footerBtns[0].text = 'Ok'
        optionsFruitsPrice.title = fruits[ind].title
        optionsFruitsPrice.content = `<span>The price is:</span> 
        <p><b>${fruits[ind].price}</b></p>`
        // Создаем экцемпляр м.о. Price для нашего списка карточек
        let fruitsModal = $.modal(optionsFruitsPrice)
        fruitsModal.open()
    }
    el.del = function () {
        const cancelBtn = {
            text: 'Cancel',
            type: 'danger',
            data: 'mmm'
        }
        optionsFruitsPrice.title = 'Confirm deleteing'
        optionsFruitsPrice.content = 'Are u sure?'

        optionsFruitsPrice.footerBtns[0].text = 'Yes, Delete'
        optionsFruitsPrice.footerBtns[0].data = 'ddd'
        if (!optionsFruitsPrice.footerBtns.filter(el => el.text === 'Cancel').length >= 1) {
            console.log(optionsFruitsPrice.footerBtns)
            optionsFruitsPrice.footerBtns.push(cancelBtn)
        }
        optionsFruitsPrice.delEl = function () {
            let cardDel = document.getElementById(`${el.id}`)
            cardDel.parentNode.removeChild(cardDel)
        }
        // Создаем экцемпляр м.о. Delete confirmation для нашего списка карточек
        let confirmModal = $.confirm(optionsFruitsPrice)
        confirmModal.open()
    }
})

// Вызываем функцию создания списка карточек и передаем в нее массив объектов
_createCardsList(fruits)