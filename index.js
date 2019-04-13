const express = require('express');

const app = express();
const port = 3700;

// eslint-disable-next-line no-path-concat
app.set('views', `${__dirname}/tpl`);
app.set('view engine', 'jade');
// eslint-disable-next-line no-underscore-dangle
app.engine('jade', require('jade').__express);

app.get('/', (req, res) => {
  res.render('page');
});

// eslint-disable-next-line no-path-concat
app.use(express.static(`${__dirname}/public`));

const io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', (socket) => {
  socket.emit('message', { message: 'welcome to the chat' });
  socket.on('send', (data) => {
    io.sockets.emit('message', data);
  });
});

// eslint-disable-next-line no-console
console.log(`Listening on port ${port}`);
