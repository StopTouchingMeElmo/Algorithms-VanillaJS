$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            closable: false,
            content: options.content,
            width: '300px',
            onClose() {
                modal.destroy()
            },
            footerBtns: [{
                    text: 'Cancel',
                    type: 'secondary',
                    handler() {
                        modal.close()
                        reject()
                    }
                },
                {
                    text: 'Delete',
                    type: 'danger',
                    handler() {
                        modal.close()
                        resolve()
                    }
                }

            ]
        })
        //Так как тут мы работаем с асинхронным кодом то:
        //Таймаут необходим для того, чтобы сработала анимация. Без таймаута не сработает transition, так как
        //в верстке сразу будет лежать класс с конечными свойствами. Таймаутом мы откладываем момент добавления класса
        //с новыми свойствами css, т.о. срабатывает переход от одних свойств к другим (transition).
        setTimeout(() => {
            modal.open()
        }, 100)
    })
}