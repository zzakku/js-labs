export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
            <a id="back-button">
                <img class="v-mid ml0-l my-logo align-middle" alt="Rust Logo" src="https://blog.rust-lang.org/images/rust-logo-blk.svg">
                <span class="home-btn align-middle">Rust Blog</span>
            </a>
            `
//            `
//                <button id="back-button" class="home-btn btn btn-primary" type="button">Rust Blog</button>
//            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}