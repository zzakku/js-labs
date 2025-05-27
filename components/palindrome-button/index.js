export class PalindromeButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("palindrome-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="palindrome-button" class="my-btn btn-primary align-middle" type="button">Найти палиндромы</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}