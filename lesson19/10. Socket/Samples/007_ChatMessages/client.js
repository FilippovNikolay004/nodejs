window.onload = function () { 
    var btn = document.getElementById('btn'); 
    var message_input = document.getElementById('inp'); 
    var message_container = document.getElementById('messages');
    var list_group = document.getElementById('listGroup');

    // Первый запуск
    let isFirstUser = true;

    // Имя пользователя
    let nameUser = 0;

    document.getElementById('userName').oninput = function () {
        nameUser = document.getElementById('userName').value;

        console.log(nameUser);
    };

    var socket = io.connect('http://localhost:8080');

    socket.on('chat message', function (message) {
        console.log(message)
        // сгенерировать html разметку сообщения 
        var display_message = `
        <div class ="panel well">
            <h4>Message from: ${nameUser}</h4>
            <h5>${message.text}</h5>
        </div>`

        // добавить результат на страницу 
        message_container.innerHTML += display_message;

        if (isFirstUser && message.userName === nameUser) {
            list_group.innerHTML += `<li class="list-group-item"><a href="${nameUser}">${nameUser}</a></li>`;
            isFirstUser = false;
        } else if (!isFirstUser && !list_group.innerHTML.includes(message.userName)) {
            list_group.innerHTML += `<li class="list-group-item"><a href="#">${message.userName}</a></li>`;
        }
    })

    btn.onclick = function () {
        // сгенерировать событие отправки сообщения 
        socket.emit('send message', { text: message_input.value, userName: nameUser });
        message_input.value = '';
    }
}