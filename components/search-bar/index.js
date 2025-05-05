export class SearchBarComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("search-bar")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <input id="search-bar" class="" type="text" placeholder="эгегей">Поиск</input>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforebegin', html)
        this.addListeners(listener)
    }
}