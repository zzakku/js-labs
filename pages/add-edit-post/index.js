import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

import {PostComponent} from "../../components/post/index.js";

import { ajax } from "../../modules/ajax.js";
import { blpostUrls } from "../../modules/blpostUrls.js";

export class AddEditPostPage {
    constructor(parent, currentData = null)
    {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="container-fluid">
                    <nav id="header" class="navbar navbar-expand-lg">
                        <div id="home-container" class = "navbar-brand"></div>
                    </nav>
                    <div id="button-container" class = "d-flex flex-wrap gap-3"></div>
                    <div id="card-container" class="d-flex flex-wrap gap-3"></div>
                <div/>
            `
        )
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const home = document.getElementById("home-container")

        const backButton = new BackButtonComponent(home)
        backButton.render(this.clickBack.bind(this))

        this.getData();
    }

}