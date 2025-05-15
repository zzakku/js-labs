export class SearchBarComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("search-bar")
            .addEventListener("input", listener)
    }

    getHTML() {
        return (
            `
                <input id="search-bar" class="align-middle search-bar" type="text" placeholder="Search..."></input>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}