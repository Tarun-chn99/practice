const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;
console.log(app);
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/userNotes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`);
})
