const express = require('express');
const app = express();
////////////////////////////////////

const fileUpload = require('express-fileupload');
app.use(fileUpload());

//////// MAKING AN OBJECT TO USE IN FILE HANDLING ///////
const fs = require('fs');

/////////////////////////////////////////////////////////
// before we can use body-parser we must install it => npm install body-parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////
// set the view engine to ejs/// we must install ejs => npm install ejs
app.set('view engine', 'ejs');
///////////////////////////////////////////////////////


app.use('/form', express.static(__dirname + '/index.html'));

app.get('/ping', function (req, res) {
  res.send('pong');
});

app.use('/', (req, res, next) => {
  next();
});
app.use('/index.html', express.static('index.html'));
app.use('/about.html', express.static('about.html'));
app.use('/admin', express.static('admin'));
app.use('/contact.html', express.static('contact.html'));
app.use('/german', express.static('german'));
app.use('/farsi', express.static('farsi'));
app.use('/arabi', express.static('arabi'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/docs', express.static('docs'));
app.use('/images', express.static('images'));
app.use('/bootstrap-3.3.7-dist', express.static('bootstrap-3.3.7-dist'));
app.use('/views', express.static('views'));

////////////////////////////////////////////////////////////////////////////////////
/////this Require is needed to read a pdf file . wihtout this the data in client are not readable
var PDF = require('pdfreader').PdfReader;

/////////////////////////////////////////////////////////////////

app.get('/', function (req, res, next) {
  res.sendFile("index.html", { root: __dirname });
});
//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
app.get("/fileDataSend", (req, res) => {

  let fileName = req.query["fileName"];


  //////////// this part was used to check the pdf reading. successfully done!!
  //       if (err){console.log(err);}
  // else if(!item)
  //     console.log("no more item");
  // else {
  //       console.log( item.text);    }
  ////////////////////////////////////////////////////////////////////

  // /////////try a new way to read pdf files
  new PDF().parseFileItems("./uploads/" + fileName, function (err, item) {
    if (err) { console.log(err); }
    else {
      console.log("here");
      console.log(item.text);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////

/// this function recieves the file from user and saves it in a folder (uploads)

////////////////////////////////////////////////////////////////////////////////

app.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;
  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line
  sampleFile = req.files.article;
  uploadPath = __dirname + '/uploads/' + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(__dirname + '/uploads/' + sampleFile.name);
    }
    res.send('File uploaded to ' + uploadPath);
  });
});

//////////////////////////////////////////////////////////////////////////////


app.use('/admin/hand', (req, res) => {

  var name = req.body.username;
  var pass = req.body.password;

  let act = 'http://localhost:3000/upload'
  if (name == "peer2018" && pass == "1234") {
    access = true;
    res.render('admin.ejs', { name: name, act: act });
  }
  else {
    access = false;
    res.render('admin.ejs', { access: "denied" });
  }
});


app.use('/articles.html', (req, res) => {
  // ////the both ways that comes below work . both are rigth

  //var fileName = req.query['fileName'];
  var fileName = req.query.fileName;
  ///////////////////////////////////////
  const articleFolder = './uploads/';
  var articleData = "";
  //// here we retrieve the files of  uploads folder and save it in => articles 
  const fs = require('fs');
  let articles = fs.readdirSync(articleFolder);
  ///////////////here we render the page and we send the file to the page
  new PDF().parseFileItems("./uploads/" + fileName, function (err, item) {
    //// End of process? render the page
    if(!item){     
      res.render('articles.ejs', { articles: articles, articleData: articleData });
     }
     //// as long as process of reading still going on.... continue
    else if(item.text){articleData += (item.text );}
    /// catch the error
    else if (err){console.log(err);}
   
    });
 
});




app.listen(3000, () => { console.log('listening....') });
