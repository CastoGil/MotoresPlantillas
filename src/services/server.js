//Iniciando Api con express
const express = require("express");
const path = require("path");
const mainRouter = require("../routes/index");
const app = express();

app.use(express.json());//leer en formato json
app.use(express.urlencoded({ extended: true }));//leer en formato formulario
app.use(express.static("public"));//lee la carpeta public

//Configuracion Ejs
app.set("view engine", "ejs");
const viewsPath = path.resolve(__dirname, "../../views");
app.set("views", viewsPath);
//

//Llamando la view principal (index.ejs)
app.get('/', (req, res) => {
  res.render('index');
});

//En caso de error de la API muestra un mensaje
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    message,
  });
});
app.use("/api", mainRouter);
module.exports = app;
