import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

import {PostComponent} from "../../components/post/index.js";

import { ajax } from "../../modules/ajax.js";
import { blpostUrls } from "../../modules/blpostUrls.js";

import { encDate, decDate } from "../../misc/functions.js";

export class AddEditPostPage {
    constructor(parent, postId = null) {
        this.parent = parent;
        this.postId = postId; // null для нового поста, число для редактирования
        this.isEditMode = postId !== null;
        this.postData = {
            title: '',
            text: '',
            date: encDate(new Date())
        };
    }

    // Загрузка данных поста для редактирования
    loadPostData() {
        if (!this.isEditMode) return;

        ajax.get(blpostUrls.getBlPostById(this.postId), (data, status) => {
            if (status === 200 && data) {
                this.postData = data;
                this.fillForm();
            } else {
                console.error('Ошибка загрузки данных поста:', status);
            }
        });
    }

    // Заполнение формы данными
    fillForm() {
        document.getElementById('post-title').value = this.postData.title;
        document.getElementById('post-text').value = this.postData.text;
    }

    // Обработчик сохранения
    handleSave(e) {
        e.preventDefault();
        
        this.postData = {
            title: document.getElementById('post-title').value,
            text: document.getElementById('post-text').value,
            date: this.isEditMode ? this.postData.date : this.getCurrentDate()
        };

        if (this.isEditMode) {
            this.updatePost();
        } else {
            this.createPost();
        }
    }

    // Создание нового поста
    createPost() {
        ajax.post(blpostUrls.createBlPost(), this.postData, (data, status) => {
            if (status === 200 || status === 201) {
                alert('Пост успешно создан!');
                this.clickBack();
            } else {
                console.error('Ошибка создания поста:', status);
                alert('Ошибка при создании поста');
            }
        });
    }

    // Обновление существующего поста
    updatePost() {
        ajax.patch(blpostUrls.updateBlPostById(this.postId), this.postData, (data, status) => {
            if (status === 200 || status === 204) {
                alert('Пост успешно обновлён!');
                this.clickBack();
            } else {
                console.error('Ошибка обновления поста:', status);
                alert('Ошибка при обновлении поста');
            }
        });
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getHTML() {
        return `
            <div id="post-edit-page" class="container-fluid">
                <nav id="header" class="navbar navbar-expand-lg">
                    <div id="home-container" class = "navbar-brand"></div>
                </nav>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h2 class="mb-0">${this.isEditMode ? 'Редактировать пост' : 'Новый пост'}</h2>
                            <button id="back-btn" class="my-btn">Назад</button>
                        </div>
                        
                        <form id="post-form">
                            <div class="mb-3">
                                <label for="post-title" class="form-label">Заголовок</label>
                                <input 
                                    type="text" 
                                    class="form-control search-bar" 
                                    id="post-title" 
                                    required
                                    placeholder="Введите заголовок"
                                >
                            </div>
                            
                            <div class="mb-3">
                                <label for="post-text" class="form-label">Текст</label>
                                <textarea 
                                    class="form-control search-bar" 
                                    id="post-text" 
                                    rows="8"
                                    required
                                    placeholder="Напишите содержание поста"
                                ></textarea>
                            </div>
                            
                            <button type="submit" class="my-btn primary">
                                ${this.isEditMode ? 'Обновить пост' : 'Создать пост'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        const home = document.getElementById("home-container")
    
        const backButton = new BackButtonComponent(home)
        backButton.render(this.clickBack.bind(this))
        
        document.getElementById('post-form').addEventListener('submit', this.handleSave.bind(this));
        document.getElementById('back-btn').addEventListener('click', this.clickBack.bind(this));
        
        if (this.isEditMode) {
            this.loadPostData();
        }
    }
}