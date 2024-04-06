const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
  ];

app.get('/productos', (req, res) => {
res.json(productos);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});


app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  productos.push(nuevoProducto);
  res.status(201).send(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
      productos[indice] = {...productos[indice], ...req.body};
      res.send(productos[indice]);
  } else {
      res.status(404).send('Producto no encontrado');
  }
});

app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
      productos.splice(indice, 1);
      res.status(200).send(`Producto con id ${id} eliminado`);
  } else {
      res.status(404).send('Producto no encontrado');
  }
});

