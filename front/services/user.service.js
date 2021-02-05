class UserService {
    constructor() {
        this.pathApi = 'http://localhost:3300/user';
    }

    async all() {
        const res = await fetch(this.pathApi, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return await res.json();
    }

    async get(id) {
        const res = await fetch(`${this.pathApi}/${id}`, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return await res.json();
    }

    async store(user) {
        const res = await fetch(this.pathApi, {
            method: 'POST',
            body: user
        });
        return await res.json();
    }

    async edit(user) {
        const res = await fetch(`${this.pathApi}/${id}`, {
            method: 'PUT'
        });
        return await res.json();
    }

    async delete(id) {
        const res = await fetch(`${this.pathApi}/${id}`, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        });
        return await res.json();
    }

}

module.exports = new UserService();