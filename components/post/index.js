export class PostComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                            <div class="my-card card-body">
                                <h3 class="card-title">${data.title}</h3>
                                <h5 class="card-text" style="color: rgb(170,174,165);">${data.date}</h5>
                                <p class="card-text">${data.text}</p>
                            </div>
                </div>
            `

            //                        <div class="col-md-4">
            //                            <img src="${data.src}" class="img-fluid" alt="картинка">
            //            </div>
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}