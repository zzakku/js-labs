class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async get_async(url, callback) {
        try {
            let result = await fetch(url)

            const data = await result.json()
            callback(data, result.status)
        }
        catch(e) {
            console.log(e)
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async post_async(url, data, callback) {
        try {
            let result = await fetch(url, {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify(data)
            })

            callback(data, result.status)
        }
        catch(e) {
            console.log(e)
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async patch_async(url, data, callback) {
        try {
            let result = await fetch(url, {
                method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify(data)
            })

            callback(data, result.status)
        }
        catch(e) {
            console.log(e)
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async delete_async(url, data, callback) {
        try {
            let result = await fetch(url, {
                method: "DELETE"
            })

            callback(data, result.status)
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const ajax = new Ajax();