// Массив карточек
let fruits = [{
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

const toHtml = fruit =>
    `<div class="col">
    <div class="card">
        <img class="card-img-top" style="height: 250px;"
            src="${fruit.img}" alt="${fruit.title}">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id='${fruit.id}'>Show price</a>
            <a href="#" class="btn btn-danger" data-btn="confirm" data-id='${fruit.id}'>Delete</a>
        </div>
    </div>
</div>`


function render() {
    //const html = fruits.map(el => toHtml(el)).join('')
    const html = fruits.map(toHtml).join('')
    document.querySelector('#fruitsRow').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'The price is:',
    closable: true,
    width: '300px',
    footerBtns: [{
            text: 'Close',
            type: 'primary',
            handler() {
                priceModal.close()
            }
        }

    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(el => el.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
        <strong>${fruit.price}$</strong>
        <p>for</p>
        <p>${fruit.title}</p>`)
        priceModal.open()
    } else if (btnType === 'confirm') {
        $.confirm({
                title: 'Are u sure?',
                content: `<p>You are deleteing fruits: ${fruit.title}</p>`
            })
            .then(() => {
                fruits = fruits.filter(el => el.id !== id) //удаление элемента путем переопределения исходного массива с последующей его загрузкой
                render()
            })
            .catch(() => {
                console.log('Cancel clicked')

            })
    }
})