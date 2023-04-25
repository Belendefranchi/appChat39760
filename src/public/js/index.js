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
    socket.emit('authenticated', user);
});

chatbox.addEventListener('keyup', evt => {
    if(evt.key==='Enter') {
        if(chatbox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatbox.value});
            chatbox.value='';
        }
    }
});

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages += `<p><strong>${message.user} dice:</strong>: ${message.message}</p>`;
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat!`,
        icon: 'success',
    });
});
