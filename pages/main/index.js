import {PostCardComponent} from "../../components/post-card/index.js";
import {PostPage} from "../post/index.js";
import {AddButtonComponent} from "../../components/add-button/index.js";
import {DeleteButtonComponent} from "../../components/delete-button/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import { SearchBarComponent } from "../../components/search-bar/index.js";
import { PalindromeButtonComponent } from "../../components/palindrome-button/index.js";

import { isEqualObj, maxKDiff, fill, isPalindrome, encDate, decDate } from "../../misc/functions.js";

// 1.7, 1.9, 2.6, 3.8

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentData = this.getData();
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new PostPage(this.parent, cardId)
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
//                console.log(maxKDiff([5,6,2,7,4]))
//                console.log(fill(3,'a'))
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

    clickSort() {
        const sortedArray = [...this.currentData];
    
        sortedArray.sort((a, b) => {
            const dateA = decDate(a.date).getTime();
            const dateB = decDate(b.date).getTime();
        
            return dateB - dateA;
        });
    
        this.currentData = sortedArray;
        this.render();
    }

    // Кнопка "Удалить запись"
    clickDelete(postId) {
        const index = this.currentData.findIndex(item => item.id === postId);

        if (index !== -1) {
            this.currentData.splice(index, 1);
            this.render();
        }
    }

    //Кнопка "Домой"
    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    //Кнопка "Найти палиндромы"
    clickPalindromes() {
        let pals = new Set()

        this.currentData.forEach(element => {
            if (isPalindrome(element.title)) {
                pals.add(element.title)
            }
        })

        alert(`Найдены палиндромы:\n${Array.from(pals).join('\n')}`)
    }


    get pageRoot() {
        return document.getElementById('main-page')
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

    getData() {
        return [
            {
                id: 1,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "ama",
//                 title: "Help us create a vision for Rust's future",
                date: "1 янв. 2023",
                text: "tl;dr: Пройдите наш опрос"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Новый ABI C для `wasm32-unknown-unknown`",
                date: "2 янв. 2023",
                text: 'Внешний ABI "C" для сборки под wasm32-unknown-unknown были основаны на нестандартном определении и имели ряд недостатков. В будущей версии этот ABI будет заменён на официальный.'
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Анонс Rust 1.86.0",
                date: "1 янв. 2023",
                text: "Команда Rust рада представить новую версию Rust, 1.86.0. Rust - язык программирования, предоставляющий любому возможность написания безопасных и производительных программ."
            },
            {
                id: 4,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "bababab",
                date: "4 янв. 2023",
                text: "Команда Rust рада представить новую версию Rust, 1.86.0. Rust - язык программирования, предоставляющий любому возможность написания безопасных и производительных программ."
            },
        ]
    }
        
    renderCards(data) {

        const cardContainer = document.getElementById("card-container")

        data.forEach((item) => {
            const postCard = new PostCardComponent(cardContainer)
            postCard.render(item, {add: this.clickCard.bind(this), delete: (e) => this.clickDelete(parseInt(e.target.dataset.id))})
        })
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const home = document.getElementById("home-container")
        const buttons = document.getElementById("button-container")

        const backButton = new BackButtonComponent(home)
        backButton.render(this.clickBack.bind(this))

        const palindromeButton = new PalindromeButtonComponent(buttons)
        palindromeButton.render(this.clickPalindromes.bind(this))
        const addButton = new AddButtonComponent(buttons)
        addButton.render(this.clickAdd.bind(this))

        const sortButton = new DeleteButtonComponent(buttons)
        sortButton.render(this.clickSort.bind(this))

        const searchBar = new SearchBarComponent(buttons)
        searchBar.render(this.handleSearch.bind(this))



//        this.handleSearch()

        this.renderCards(this.currentData)
    }
}