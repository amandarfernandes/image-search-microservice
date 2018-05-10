const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5100;

const keys = require('./config/keys');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./models/searches');

const appRoutes = require('./routes/appRoutes');

//middleware to parse incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(keys.MONGO_URI, { keepAlive: true });

app.get('/', (req, res) => {
  res.sendFile('index,html');
});

app.use('/api', appRoutes);

app.listen(PORT, () => {
  console.log('Server started on Port ', PORT);
});
