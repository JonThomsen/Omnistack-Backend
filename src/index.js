// criar abstração de rotas, middlewares, http(get,post,delete,put)
const express = require("express");
// mongoose, para utilizar banco com linguagem js
// nodemon para não precisar fechar e abrir servidor,verifica alterações
// omnistack@123 node src/index.js
const mongoose = require("mongoose");
// faz autenticação para requisição ao backend
const cors = require("cors");

// microframework para roteamento
const app = express();

// ouvir ws, websocket além de http comum, para entender realtime
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb://jthomsen:omnistack123@ds141633.mlab.com:41633/omnistack",
  {
    useNewUrlParser: true
  }
);

// fazer com que const io seja visualizada no req
app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
