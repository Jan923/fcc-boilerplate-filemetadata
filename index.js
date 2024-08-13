var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();
let responseObject = {}

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  console.log(req.file['originalname'], req.file['mimetype'], req.file['size']);
  responseObject['name'] = req.file['originalname'];
  responseObject['type'] = req.file['mimetype'];
  responseObject['size'] = req.file['size'];
  //res.json({ "name":req.file['originalname'],"type":req.file['mimetype'],"size":req.file['size'] })
  res.redirect('/api/fileanalyse')
})

app.get('/api/fileanalyse', (req, res) => {
  res.json(responseObject)
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
