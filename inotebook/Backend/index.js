const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 5000

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/userNotes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})
