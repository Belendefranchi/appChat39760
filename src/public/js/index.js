const socket = io();

/* Swal.fire({
    title: 'Bienvenido!',
    text: 'Saludos desde el servidor!',
    icon: 'success',
    confirmButtonText: 'Cool'
}); */

let user;
const chatbox = document.getElementById('chatBox');

Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    text: 'Ingresa el usuario con el que quieres chatear',
    inputValidator: (value) => {
        return !value && 'Necesitas ingresar un nombre de usuario para chatear!';
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then((result) => {
    user = result.value;
});
