const express = require("express");
const app = express();

app.listen(3000, () => {
 console.log("El servidor está iniciando en el puerto 3000");
});

app.get('/reto', function (req, res) {
    res.send('Se ha consultado');
  });

  app.post('/reto', function (req, res) {
    res.send('Se ha agregado');
  });

  app.put('/reto', function (req, res) {
    res.send('Se ha actualizado');
  });

  app.delete('/reto', function (req, res) {
    res.send('Se ha eliminado');
  });

