// src/app.js
const express = require('express');
const app = express();
const port = 3012;

const controller = require('./controller');

app.use(express.json());
app.get('/api/items/:id', controller.getItemById);

// Routes
app.get('/api/items', controller.getItems);
app.post('/api/items', controller.createItem);
app.put('/api/items/:id', controller.updateItem);   // Update route
app.delete('/api/items/:id', controller.deleteItem); // Delete route

// Start the server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Item name is required' });
  }
  // Proceed with creating the item
  res.status(201).json({ message: 'Item created', item: { name } });
});


module.exports = app;
