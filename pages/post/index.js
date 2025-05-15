import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

import {PostComponent} from "../../components/post/index.js";

export class PostPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    getData() {
        return {
            id: 1,
            src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
            title: `Blog post ${this.id}`,
            text: "This task would surely greatly benefit from being rewritten in Rust!"
        }
    }

    get pageRoot() {
        return document.getElementById('post-page')
    }

    getHTML() {
        return (
            `
                <div id="post-page" class="container-fluid">
                    <nav id="header" class="navbar navbar-expand-xxl">
                        <div id="home-container" class = "navbar-brand"></div>
                    </nav>
                </div>
            `
        )
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const pageHeader = document.getElementById("header")
    
        const backButton = new BackButtonComponent(pageHeader)
        backButton.render(this.clickBack.bind(this))
    
        const data = this.getData()
        const stock = new PostComponent(this.pageRoot)
        stock.render(data)
    }
}