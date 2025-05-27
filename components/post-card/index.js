export class PostCardComponent {
    constructor(parent) {
        this.parent = parent;
    }


    //TO-DO: связать с датой функцию fill
    
    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px;">
                    <div class="my-card card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <h5 class="card-text" style="color: rgb(170,174,165);">${data.date}</h3>
                        <p class="card-text">${data.text}</p>
                        <button class="read-btn" id="click-card-${data.id}" data-id="${data.id}">Читать</button>
                        <button class="delete-btn" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            `

//                    <img class="card-img-top" src="${data.src}" alt="картинка">
        )
    }

    addListeners(data, listeners) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listeners.add)
        document
            .querySelector(`[data-id="${data.id}"].delete-btn`)
            .addEventListener("click", listeners.delete)
    }
    
    render(data, listeners) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listeners)
    }
}