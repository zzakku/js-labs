import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {AddButtonComponent} from "../../components/add-button/index.js";
import {DeleteButtonComponent} from "../../components/delete-button/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import { SearchBarComponent } from "../../components/search-bar/index.js";



export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentData = this.getData();
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    // Поле поиска
    handleSearch(e) {
         const searchBar = document.getElementById("search-bar")
         const cardContainer = document.getElementById("card-container")
//        searchBar.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase()
            document.querySelectorAll('.card').forEach(card => {
                const title = card.children[1].children[0].innerHTML.toLowerCase();
                console.log(title)
                card.style.display = title.includes(searchQuery) ? 'block' : 'none';
            });
//        }); */
    }

    // Кнопка "Добавить запись"
    clickAdd() {
        const firstItem = this.getData()[0]
        let maxId = 0

        this.currentData.forEach((item) => {
            if (maxId < item.id)
            {
                maxId = item.id
            }
        })

        firstItem.id = maxId + 1

        this.currentData.push(firstItem)

        this.render()
    }

    // Кнопка "Удалить запись"
    clickDelete() {

        this.currentData.pop() // проверка на пустоту массива не нужна, pop() же

        this.render()
    }

    //Кнопка "Домой"
    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }


    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap">
                    <div id="card-container" class="d-flex flex-column gap-3"></div>
                <div/>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 1"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 2"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 3"
            },
        ]
    }
        
    renderCards(data) {
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const addButton = new AddButtonComponent(this.pageRoot)
        addButton.render(this.clickAdd.bind(this))
        const deleteButton = new DeleteButtonComponent(this.pageRoot)
        deleteButton.render(this.clickDelete.bind(this))
        const searchBar = new SearchBarComponent(this.pageRoot)
        searchBar.render(this.handleSearch.bind(this))

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

//        this.handleSearch()

        this.renderCards(this.currentData)
    }
}