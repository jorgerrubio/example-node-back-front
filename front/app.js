import 'bootstrap/dist/css/bootstrap.min.css';
import UI from './ui';
const ui = new UI();
document.addEventListener('DOMContentLoaded', () => {
    ui.renderUsers();
})

document.getElementById('user-form').addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    const name =  document.getElementById('username').value;
    const lastname = document.getElementById('lastname').value;
    const photo = document.getElementById('photo').files;

    const dataForm = new FormData();
    dataForm.append('photo', photo[0]);
    dataForm.append('name', name);
    dataForm.append('lastname', lastname);

    ui.addNewUser(dataForm);
});

document.getElementById('user-list').addEventListener('click', e => {
    console.log('e.target.id', e.target.id);
    if (e.target.id === 'btn-delete') {
        const id = e.target.getAttribute('data-id');
        console.log('delete id:', id);
        ui.deleteUser(id);
    }
    if (e.target.id === 'btn-edit') {
        console.log(e.target.getAttribute('data-id'));
    }
});