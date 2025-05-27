export class SortButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("sort-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="sort-button" class="my-btn btn-primary align-middle" type="button">Отфильтровать по дате</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}