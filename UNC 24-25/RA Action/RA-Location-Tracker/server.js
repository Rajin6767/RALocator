const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to get current status
app.get('/api/status', (req, res) => {
  fs.readFile('status.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Error reading status' });
    }
    res.send(JSON.parse(data));
  });
});

// Endpoint to update status
app.post('/api/status', (req, res) => {
  const { status, password } = req.body;

  // Simple authentication
  if (password !== 'your_secure_password') {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const newStatus = {
    status,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFile('status.json', JSON.stringify(newStatus), (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error updating status' });
    }
    res.send({ message: 'Status updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
