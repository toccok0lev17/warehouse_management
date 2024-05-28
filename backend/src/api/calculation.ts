import express from 'express';

const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { warehouseSize, currentStock, movementType, quantity } = req.body;
  let newStock = currentStock;

  if (movementType === 'import') {
    newStock += quantity;
  } else if (movementType === 'export') {
    newStock -= quantity;
  }

  if (newStock > warehouseSize) {
    return res.status(400).send('Exceeds warehouse capacity');
  }

  res.send({ newStock, remainingSpace: warehouseSize - newStock });
});

app.listen(5000, () => {
  console.log('Calculation API listening on port 5000');
});
