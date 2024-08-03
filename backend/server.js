const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');
const cors = require('cors');



const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/blogs', blogRouter);


// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
