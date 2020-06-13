// Файл, отвечающий за само приложение,
// подключаем в index.html в самом конце

const fruits = [{
        id: 1,
        title: 'Apples',
        price: 20,
        img: 'https://thelunchlady.ca/wp-content/uploads/2015/10/Apples-in-your-diet.jpg'
    },
    {
        id: 2,
        title: 'Oranges',
        price: 25,
        img: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Orange-Whole-%26-Split.jpg'
    },
    {
        id: 3,
        title: 'Mango',
        price: 30,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/1200px-Mango_and_cross_section_edit.jpg'
    }
]

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