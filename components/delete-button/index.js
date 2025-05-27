export class DeleteButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("delete-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="delete-button" class="my-btn btn-primary align-middle" type="button">Отфильтровать по дате</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}