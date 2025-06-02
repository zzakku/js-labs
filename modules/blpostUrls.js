class BlPostUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getBlPosts() {
        return `${this.baseUrl}/blposts`;
    }

    getBlPostById(id) {
        return `${this.baseUrl}/blposts/${id}`;
    }

    createBlPost() {
        return `${this.baseUrl}/blposts`;
    }

    removeBlPostById(id) {
        return `${this.baseUrl}/blposts/${id}`;
    }

    updateBlPostById(id) {
        return `${this.baseUrl}/blposts/${id}`;
    }
}

export const blpostUrls = new BlPostUrls();