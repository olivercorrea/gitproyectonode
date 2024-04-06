const express = require('express');
const app = express();
app.use(express.json());

const productos = [
    { id: 1, nombre: 'Freidora', precio: 99 },
    { id: 2, nombre: 'PowerBank', precio: 89 },
    { id: 3, nombre: 'Tablet', precio: 329 }
  ];

const clientes = [
    { id: 1, nombre: 'Jacklyn Noel', contacto: 'jacklyn.noel@gmail.com' },
    { id: 2, nombre: 'Jordan Mclean', contacto: 'jordan.maclean@gmail.com' },
    { id: 3, nombre: 'Bart Hickman', contacto: 'bart.hickman@gmail.com' }
];

app.get('/', (req, res) => res.send('Tarea del laboratorio 04 de DSN, presentado por Oliver'));
app.get('/clientes', (req, res) => res.json(clientes));

app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    nuevoCliente.id = clientes.length + 1;
    clientes.push(nuevoCliente);
    res.status(201).send(nuevoCliente);
});

app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(c => c.id === id);
    if (indice !== -1) {
        clientes[indice] = {...clientes[indice], ...req.body};
        res.send(clientes[indice]);
    } else {
        res.status(404).send('Cliente no habido');
    }
});

app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(c => c.id === id);
    if (indice !== -1) {
        clientes.splice(indice, 1);
        res.status(200).send(`Cliente ${id} eliminado`);
    } else {
        res.status(404).send('Dicho cliente no existe');
    }
});
app.get('/productos', (req, res) => {
res.json(productos);
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
      res.status(404).send('Dicho producto no existe');
  }
});

app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
      productos.splice(indice, 1);
      res.status(200).send(`Producto ${id} eliminado`);
  } else {
      res.status(404).send('Dicho producto no existe');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});

