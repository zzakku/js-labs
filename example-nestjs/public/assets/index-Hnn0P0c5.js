(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();class b{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card" style="width: 300px;">
                    <div class="my-card card-body">
                        <h5 class="card-title">${t.title}</h5>
                        <h5 class="card-text" style="color: rgb(170,174,165);">${t.date}</h3>
                        <p class="card-text">${t.text}</p>
                        <div class="d-flex justify-content-between">
                            <button class="read-btn" id="click-card-${t.id}" data-id="${t.id}">Читать</button>
                            <button class="delete-btn" id="delete-card-${t.id}" data-id="${t.id}">Удалить</button>
                            <button class="edit-btn" id="edit-card-${t.id}" data-id="${t.id}">Редакт.</button>
                    </div>
                </div>
            `}addListeners(t,e){document.getElementById(`click-card-${t.id}`).addEventListener("click",e.add),document.querySelector(`[data-id="${t.id}"].delete-btn`).addEventListener("click",e.delete),document.querySelector(`[data-id="${t.id}"].edit-btn`).addEventListener("click",e.edit)}render(t,e){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e)}}class h{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
            <a id="back-button">
                <img class="v-mid ml0-l my-logo align-middle" alt="Rust Logo" src="https://blog.rust-lang.org/images/rust-logo-blk.svg">
                <span class="home-btn align-middle">Rust Blog</span>
            </a>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class y{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="my-card card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class f{async get(t,e){try{let s=await fetch(t);const n=await s.json();e(n,s.status)}catch(s){console.log(s)}}async post(t,e,s){try{let n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});s(e,n.status)}catch(n){console.log(n)}}async patch(t,e,s){try{let n=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});s(e,n.status)}catch(n){console.log(n)}}async delete(t,e){try{let s=await fetch(t,{method:"DELETE"});e(data,s.status)}catch(s){console.log(s)}}}const d=new f;class v{constructor(){this.baseUrl="http://localhost:3000"}getBlPosts(){return`${this.baseUrl}/blposts`}getBlPostById(t){return`${this.baseUrl}/blposts/${t}`}getBlPostsByQuery(t){return`${this.baseUrl}/blposts?${encodeURIComponent(t)}`}createBlPost(){return`${this.baseUrl}/blposts`}removeBlPostById(t){return`${this.baseUrl}/blposts/${t}`}updateBlPostById(t){return`${this.baseUrl}/blposts/${t}`}}const o=new v;class B{constructor(t,e){this.parent=t,this.id=e}clickBack(){new l(this.parent).render()}getData(){d.get(o.getBlPostById(this.id),t=>{this.renderData(t)})}get pageRoot(){return document.getElementById("post-page")}getHTML(){return`
                <div id="post-page" class="container-fluid">
                    <nav id="header" class="navbar navbar-expand-xxl">
                        <div id="home-container" class = "navbar-brand"></div>
                    </nav>
                </div>
            `}renderData(t){new y(this.pageRoot).render(t)}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t);const e=document.getElementById("home-container");new h(e).render(this.clickBack.bind(this)),this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}function p(a){const t=["янв.","фев.","мар.","апр.","мая","июн.","июл.","авг.","сен.","окт.","дек."],e=a.getFullYear(),s=a.getMonth();return`${a.getDate()} ${t[s]} ${e}`}function m(a){const t=a.split(" ");if(t.length!==3)throw new Error('Неверный формат строки. Ожидается "XX yyy. ZZZZ"');const e=parseInt(t[0],10),s=t[1],n=parseInt(t[2],10),i={"янв.":0,"фев.":1,"мар.":2,"апр.":3,мая:4,"июн.":5,"июл.":6,"авг.":7,"сен.":8,"окт.":9,"ноя.":10,"дек.":11}[s.toLowerCase()];if(i===void 0)throw new Error("Неверное сокращение месяца");const c=new Date(n,i,e);if(c.getDate()!==e||c.getMonth()!==i||c.getFullYear()!==n)throw new Error("Неверная дата");return c}class g{constructor(t,e=null){this.parent=t,this.postId=e,this.isEditMode=e!==null,this.postData={title:"",text:"",date:p(new Date)}}loadPostData(){this.isEditMode&&d.get(o.getBlPostById(this.postId),(t,e)=>{e===200&&t?(this.postData=t,this.fillForm()):console.error("Ошибка загрузки данных поста:",e)})}fillForm(){document.getElementById("post-title").value=this.postData.title,document.getElementById("post-text").value=this.postData.text}handleSave(t){t.preventDefault(),this.postData={title:document.getElementById("post-title").value,text:document.getElementById("post-text").value,date:this.isEditMode?this.postData.date:p(new Date)},this.isEditMode?this.updatePost():this.createPost()}createPost(){d.post(o.createBlPost(),this.postData,(t,e)=>{e===200||e===201?(alert("Пост успешно создан!"),this.clickBack()):(console.error("Ошибка создания поста:",e),alert("Ошибка при создании поста"))})}updatePost(){d.patch(o.updateBlPostById(this.postId),this.postData,(t,e)=>{e===200||e===204?(alert("Пост успешно обновлён!"),this.clickBack()):(console.error("Ошибка обновления поста:",e),alert("Ошибка при обновлении поста"))})}clickBack(){new l(this.parent).render()}getHTML(){return`
            <div id="post-edit-page" class="container-fluid">
                <nav id="header" class="navbar navbar-expand-lg">
                    <div id="home-container" class = "navbar-brand"></div>
                </nav>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h2 class="mb-0">${this.isEditMode?"Редактировать пост":"Новый пост"}</h2>
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
                                ${this.isEditMode?"Обновить пост":"Создать пост"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `}render(){this.parent.innerHTML=this.getHTML();const t=document.getElementById("home-container");new h(t).render(this.clickBack.bind(this)),document.getElementById("post-form").addEventListener("submit",this.handleSave.bind(this)),document.getElementById("back-btn").addEventListener("click",this.clickBack.bind(this)),this.isEditMode&&this.loadPostData()}}class L{constructor(t){this.parent=t}addListeners(t){document.getElementById("add-button").addEventListener("click",t)}getHTML(){return`
                <button id="add-button" class="my-btn btn-primary align-middle" type="button">Добавить запись</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class E{constructor(t){this.parent=t}addListeners(t){document.getElementById("sort-button").addEventListener("click",t)}getHTML(){return`
                <button id="sort-button" class="my-btn btn-primary align-middle" type="button">Отфильтровать по дате</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class D{constructor(t){this.parent=t}addListeners(t){document.getElementById("search-bar").addEventListener("input",t)}getHTML(){return`
                <input id="search-bar" class="align-middle search-bar" type="text" placeholder="Поиск..."></input>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class l{constructor(t){this.parent=t,this.currentData=[],this.filteredData=[],this.searchQuery=""}clickCard(t){const e=t.target.dataset.id;new B(this.parent,e).render()}handleSearch(t){this.searchQuery=t.target.value.toLowerCase(),this.filterCards()}filterCards(){this.searchQuery?this.filteredData=this.currentData.filter(t=>t.title.toLowerCase().includes(this.searchQuery)):this.filteredData=[...this.currentData],this.updateCardDisplay()}clickAdd(){new g(this.parent).render()}clickSort(){const t=[...this.filteredData];t.sort((e,s)=>{const n=m(e.date).getTime();return m(s.date).getTime()-n}),this.filteredData=t,this.updateCardDisplay()}clickEdit(t){new g(this.parent,t).render()}clickDelete(t){this.currentData.findIndex(e=>e.id===t),confirm("Вы действительно хотите удалить данный пост?")&&d.delete(o.removeBlPostById(t),(e,s)=>{s===200||s===202||s===204?this.render():console.error("Ошибка удаления данных:",s)})}clickBack(){new l(this.parent).render()}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
                <div id="main-page" class="container-fluid">
                    <nav id="header" class="navbar navbar-expand-lg">
                        <div id="home-container" class = "navbar-brand"></div>
                    </nav>
                    <div id="button-container" class = "d-flex flex-wrap gap-3"></div>
                    <div id="card-container" class="d-flex flex-wrap gap-3"></div>
                <div/>
            `}getData(){d.get(o.getBlPosts(),(t,e)=>{if(e===200&&t){this.currentData=t,this.filteredData=[...t],this.updateCardDisplay();const s=document.getElementById("search-input");s&&this.searchQuery&&(s.value=this.searchQuery,this.filterCards())}else console.error("Ошибка загрузки данных:",e),this.currentData=[],this.filteredData=[],this.updateCardDisplay()})}updateCardDisplay(){const t=document.getElementById("card-container");t&&(t.innerHTML="",this.renderCards(this.filteredData))}renderCards(t){const e=document.getElementById("card-container");t.forEach(s=>{new b(e).render(s,{add:this.clickCard.bind(this),delete:r=>this.clickDelete(parseInt(r.target.dataset.id)),edit:r=>this.clickEdit(parseInt(r.target.dataset.id))})})}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t);const e=document.getElementById("home-container"),s=document.getElementById("button-container");if(new h(e).render(this.clickBack.bind(this)),new L(s).render(this.clickAdd.bind(this)),new E(s).render(this.clickSort.bind(this)),new D(s).render(this.handleSearch.bind(this)),this.searchQuery){const u=document.getElementById("search-input");u&&(u.value=this.searchQuery)}this.getData()}}const k=document.getElementById("root"),w=new l(k);w.render();
