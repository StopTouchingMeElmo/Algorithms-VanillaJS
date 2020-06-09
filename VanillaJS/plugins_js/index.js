// Файл, отвечающий за само приложение,
// подключаем в index.html в самом конце

// Наш экземпляр м.о., у которого уже есть методы родителя (modal.js)

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

const myModal = $.modal(options)