export class PostCardComponent {
    constructor(parent) {
        this.parent = parent;
    }


    //TO-DO: дата на карточке
    //TO-DO: связать с датой функцию fill
    //TO-DO: добавить удаление карточки прямо на карточку
    
    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px;">
                    <div class="my-card card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="read-btn" id="click-card-${data.id}" data-id="${data.id}">Read</button>
                    </div>
                </div>
            `

//                    <img class="card-img-top" src="${data.src}" alt="картинка">
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}