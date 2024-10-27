const express = require('express');
const connection = require('./database')

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());



app.get('/user', (req, res) => {
  const { username, password } = req.query;

  const sql = 'SELECT * FROM user WHERE Username = ? AND Password = ?';

  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      res.json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


app.post('/api/shorten', (req, res) => {
  const { originalUrl, userId } = req.body;

  if (!originalUrl || !userId) {
    return res.status(400).json({ error: 'Missing originalUrl or userId' });
  }


  const shortUrl = Math.random().toString(36).substr(2, 5);

  const sql = 'INSERT INTO fullurl (OriginalURL, ShortURL, User_idUser) VALUES (?, ?, ?)';

  connection.query(sql, [originalUrl, shortUrl, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Short URL created successfully', ShortURL: shortUrl });
  });
});


app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  const sql = 'SELECT OriginalURL FROM fullurl WHERE ShortURL = ?';

  connection.query(sql, [shortUrl], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      const originalUrl = results[0].OriginalURL;
      res.redirect(originalUrl);
    } else {
      res.status(404).json({ message: 'Short URL not found' });
    }
  });
});


app.get('/api/urls', (req, res) => {
  const sql = 'SELECT OriginalURL AS originalUrl, ShortURL AS shortUrl FROM fullurl';

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});