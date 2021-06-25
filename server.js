const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');


const db = require('./database.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const conn = db.conn()

const multer = require('multer')
const upload = multer({dest: './upload'});
app.use('/image', express.static('./upload'));

app.get('/api/customers', (req, res) => {
  let q = 'select * from customer';
  conn.query(q, (err, result, feild) => {
    try {
      console.log("Query 실행")
      res.send(result);
    } catch {
      console.error(err);
    }
  });
})

app.post('/api/customers', upload.single('image'), (req, res) => {
  let q = 'insert into customer values (null, ?, ?, ?, ?, ?)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  conn.query(q, params, (err, result, feild) => {
    try {
      console.log("Query 실행")
      res.send(result);
    } catch {
      console.error(err);
    }
  });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})