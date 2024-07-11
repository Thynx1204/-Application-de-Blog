const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');


const app = express();

app.use(express.json());

app.use('/', authRouter);
app.use('/blogs', blogRouter);


// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
