import {PostCardComponent} from "../../components/post-card/index.js";
import {PostPage} from "../post/index.js";
import { AddEditPostPage } from "../add-edit-post/index.js";
import {AddButtonComponent} from "../../components/add-button/index.js";
import {SortButtonComponent} from "../../components/sort-button/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import { SearchBarComponent } from "../../components/search-bar/index.js";

import { encDate, decDate } from "../../misc/functions.js";

import {ajax} from "../../modules/ajax.js";
import {blpostUrls} from "../../modules/blpostUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentData = [];
        this.filteredData = []; // currentData - общее, filteredData - отфильтрованное для отображения
        this.searchQuery = ""; // Сохранение поисковского запроса
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new PostPage(this.parent, cardId)
        productPage.render()
    }

    // Поле поиска
    handleSearch(e) {

        this.searchQuery = e.target.value.toLowerCase();
        this.filterCards();
    }

    filterCards() {
        if (!this.searchQuery) {
            this.filteredData = [...this.currentData];
        } else {
            this.filteredData = this.currentData.filter(item => 
                item.title.toLowerCase().includes(this.searchQuery)
            );
        }
        
        this.updateCardDisplay();
    }

    // Кнопка "Добавить запись"
    clickAdd() {
        const editPage = new AddEditPostPage(this.parent);
        editPage.render();
    }

    // Кнопка "Сортировать по дате"
    clickSort() {
        const sortedArray = [...this.filteredData];
    
        sortedArray.sort((a, b) => {
            const dateA = decDate(a.date).getTime();
            const dateB = decDate(b.date).getTime();
        
            return dateB - dateA;
        });
    
        this.filteredData = sortedArray;
        this.updateCardDisplay();
    }

    // Кнопка "Редактировать"
    clickEdit(e) {
        const editPage = new AddEditPostPage(this.parent, e);
        editPage.render();
    }

    // Кнопка "Удалить запись"
    clickDelete(postId) {
        const index = this.currentData.findIndex(item => item.id === postId);

        if (confirm("Вы действительно хотите удалить данный пост?")) {
            ajax.delete(blpostUrls.removeBlPostById(postId), (data, status) => {
                if ((status === 200 || status === 202 || status === 204)) {
                    this.render()
                } else {
                    console.error('Ошибка удаления данных:', status);
                }
            });
        }
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

        ajax.get(blpostUrls.getBlPosts(), (data, status) => {
          if (status === 200 && data) {
            this.currentData = data;

                this.filteredData = [...data];
                this.updateCardDisplay();
                
                // Восстанавливаем поисковый запрос если он был
                const searchInput = document.getElementById("search-input");
                if (searchInput && this.searchQuery) {
                    searchInput.value = this.searchQuery;
                    this.filterCards();
                }
          } else {
                console.error('Ошибка загрузки данных:', status);
                this.currentData = [];
                this.filteredData = [];
                this.updateCardDisplay();
          }
        });
    }

    updateCardDisplay() {
        const cardContainer = document.getElementById("card-container");
        if (!cardContainer) return;
        
        cardContainer.innerHTML = '';
        this.renderCards(this.filteredData);
    }

    renderCards(data) {

        const cardContainer = document.getElementById("card-container")

        data.forEach((item) => {
            const postCard = new PostCardComponent(cardContainer)
            postCard.render(item, {
                add: this.clickCard.bind(this),
                delete: (e) => this.clickDelete(parseInt(e.target.dataset.id)),
                edit: (e) => this.clickEdit(parseInt(e.target.dataset.id))})
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

        const addButton = new AddButtonComponent(buttons)
        addButton.render(this.clickAdd.bind(this))

        const sortButton = new SortButtonComponent(buttons)
        sortButton.render(this.clickSort.bind(this))

        const searchBar = new SearchBarComponent(buttons)
        searchBar.render(this.handleSearch.bind(this))

        if (this.searchQuery) {
            const searchInput = document.getElementById("search-input");
            if (searchInput) {
                searchInput.value = this.searchQuery;
            }
        }

        this.getData();
    }
}