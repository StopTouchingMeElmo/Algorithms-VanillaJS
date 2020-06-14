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

// Создаем объект настроек для м.о. карточек
let optionsFruitsPrice = {
    /* title: 'gg',
    content: 'gg', */
    closable: true,
    width: '300px',
    footerBtns: [{
            text: 'Ok',
            type: 'primary',
            handler() {
                console.log('ok is clicked')
            }
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

const fruits = [{
        id: 1,
        title: 'Apples',
        price: 20,
        img: 'https://thelunchlady.ca/wp-content/uploads/2015/10/Apples-in-your-diet.jpg',
        handler() {
            optionsFruitsPrice.title = fruits[0].title
            optionsFruitsPrice.content = `<span>The price is:</span> 
            <p><b>${fruits[0].price}</b></p>`
            let fruitsModal = $.modal(optionsFruitsPrice)
            fruitsModal.open()
        }

    },
    {
        id: 2,
        title: 'Oranges',
        price: 25,
        img: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Orange-Whole-%26-Split.jpg',
        handler() {
            optionsFruitsPrice.title = fruits[1].title
            optionsFruitsPrice.content = `<span>The price is:</span> 
            <p><b>${fruits[1].price}</b></p>`
            let fruitsModal = $.modal(optionsFruitsPrice)
            fruitsModal.open()
        }
    },
    {
        id: 3,
        title: 'Mango',
        price: 30,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/1200px-Mango_and_cross_section_edit.jpg',
        handler() {
            optionsFruitsPrice.title = fruits[2].title
            optionsFruitsPrice.content = `<span>The price is:</span> 
            <p><b>${fruits[2].price}</b></p>`
            let fruitsModal = $.modal(optionsFruitsPrice)
            fruitsModal.open()
        }
    }
]

/* fruits.forEach(el => {
    optionsFruitsPrice.title = el.title
    optionsFruitsPrice.content = `<span>The price is:</span> 
<p><b>${el.price}</b></p>`
}) */
/* function personalProps() {
    optionsFruitsPrice.title = this.title
    optionsFruitsPrice.content = `<span>The price is:</span> 
<p><b>${this.price}</b></p>`
    fruitsModal.open()
} */
// Создаем экцемпляр м.о. для нашего списка карточек


// Вызываем функцию создания списка карточек и передаем в нее массив объектов
_createCardsList(fruits)

/* let listenerFruits = event => {
    console.log('Clicked', event.target.dataset.fruits)
    if (event.target.dataset.fruits) fruitsModal.open()
}
document.addEventListener('click', listenerFruits) */