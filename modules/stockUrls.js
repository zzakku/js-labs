class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/blposts`;
    }

    getStockById(id) {
        return `${this.baseUrl}/blposts/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/blposts`;
    }

    removeStockById() {
        return `${this.baseUrl}/blposts/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/blposts/${id}`;
    }
}

export const stockUrls = new StockUrls();