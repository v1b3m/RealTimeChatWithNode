/* eslint-disable no-multi-assign */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

window.onload = () => {
  const messages = [];
  const socket = io.connect('http://localhost:3700');
  const field = document.getElementById('field');
  const sendButton = document.getElementById('send');
  const content = document.getElementById('content');
  const name = document.getElementById('name');

  $(document).ready(() => {
    $('#field').keyup((e) => {
      if (e.keyCode === 13) {
        sendMessage();
      }
    });
  });

  socket.on('message', (data) => {
    if (data.message) {
      messages.push(data);
      let html = '';
      for (let i = 0; i < messages.length; i++) {
        html += `<b>${(messages[i].username ? messages[i].username : 'unknown')}: </b>`;
        html += ` ${messages[i].message}<br />`;
      }
      content.innerHTML = html;
      $('#content').scrollTop($('#content')[0].scrollHeight);
    } else {
      console.log('There is a problem: ', data);
    }
  });

  sendButton.onclick = sendMessage = () => {
    if (name.value === '') {
      alert('Please type your name!');
    } else {
      const text = field.value;
      socket.emit('send', { message: text, username: name.value });
      field.value = '';
    }
  };
};
