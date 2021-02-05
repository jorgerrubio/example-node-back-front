import userService from './services/user.service';
import UserService from './services/user.service';
class UI {
    constructor() {
        this.pathApi = 'http://localhost:3300';
    }

    async addNewUser(user) {
        const res = await UserService.store(user);
        this.renderMessage(res.message, res.error ? 'danger' : 'success', 2000);
        this.clearForm();
        this.renderUsers();
    }

    clearForm() {
        document.getElementById('user-form').reset();
    }

    createCard(user) {
        const card = document.createElement('div');
        card.className = 'card m-2';

        const row = document.createElement('div');
        row.className = 'row';

        const colImage = this.createCol('4');
        colImage.innerHTML = `<img src="${this.pathApi}${user.photo}" class="img-fluid" />`;

        const colData = this.createCol('8');
        colData.innerHTML = `
            <div class="card-block px-2">
                <p class="card-text">${user.name} ${user.lastname}</p>
                <a href="#" class="btn btn-success" id="btn-edit" data-id="${user._id}">Edit</a>
                <a href="#" class="btn btn-danger" id="btn-delete" data-id="${user._id}">Delete</a>
            </div>
        `;

        row.append(colImage, colData);
        card.append(row);
        return card;
    }

    createCol(size) {
        const col = document.createElement('div');
        col.className = `col-${size}`;
        return col;
    }

    async deleteUser(id) {
        const res = await userService.delete(id);
        this.renderMessage(res.message, res.error ? 'danger' : 'success', 2000);
        this.renderUsers();
    }

    renderMessage(message, color, delay) {
        const div = document.createElement('div');
        div.className = `alert alert-${color}`;
        div.appendChild(document.createTextNode(message));

        const box = document.querySelector('.card-form');
        const form = document.getElementById('user-form');

        box.insertBefore(div, form);
        setTimeout(() => {
            div.remove();
        }, delay);
    }
    
    async renderUsers() {
        const res = await userService.all();
        const usersList = document.getElementById('user-list');
        usersList.innerHTML = '';
        res.data.forEach(user => {
            const div = document.createElement('div');
            div.className = '';
            div.append(this.createCard(user));

            usersList.append(div);
        });
    }
}

export default UI;