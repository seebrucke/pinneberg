const express = require('express');
const app = express();
////////////////////////////////////

const fileUpload = require('express-fileupload');
app.use(fileUpload());

/////////////////////////////

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

///////////////////////
// set the view engine to ejs
app.set('view engine', 'ejs');
///////////////////////////


app.use('/form', express.static(__dirname + '/index.html'));

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.use('/', (req, res , next) => {
  next();
});
app.use('/index.html', express.static('index.html'));
app.use('/about.html', express.static('about.html'));
app.use('/admin',express.static('admin'));
app.use('/contact.html', express.static('contact.html'));
app.use('/german', express.static('german'));
app.use('/farsi', express.static('farsi'));
app.use('/arabi', express.static('arabi'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/docs', express.static('docs'));
app.use('/images', express.static('images'));
app.use('/bootstrap-3.3.7-dist', express.static('bootstrap-3.3.7-dist'));
app.use('/views' , express.static('views'));


app.get('/', function(req, res,next) {
  // res.send('<a href=\'./admin/admin.html\'>go to admin page<\/a>');
  //next();
});

// app.post('/upload', function(req, res) {
//   let sampleFile;
//   let uploadPath;

// console.log("ho ho ho ")
//   if (Object.keys(req.files).length == 0) {
//     res.status(400).send('No files were uploaded.');
//     return;
//   }

//   console.log('req.files >>>', req.files); // eslint-disable-line
 

//   sampleFile = req.files.article;

//   uploadPath = __dirname + '/uploads/' + sampleFile.name;

//   sampleFile.mv(uploadPath, function(err) {
//     if (err) {
//       return res.status(500).send(__dirname + '/uploads/' + sampleFile.name);
//     }

//     res.send('File uploaded to ' + uploadPath);
//   });
// });
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
console.log('I am in upload function');
  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.article;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(__dirname + '/uploads/' + sampleFile.name);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});
    



app.use('/admin/hand', (req, res) => {

    var name2= req.body.username;
    let act = 'http://localhost:3000/upload'
    // if(name == 'ali'){res.send('hi ali');}
    // else{res.send('bye')}
    // let post = "POST";
    // let file= "file";
    // let article = "article";
    // let pdf ="*.pdf";
    // let submit = "submit";
    res.type('html').status(200);
   
    //res.writeHead(200, {'Content-Type': 'text/html'},);
    
    
    res.write('<p>hallo , ' + name2 + ', nice to meet you</p>');
  
    res.write('<form  action='+ act +' method=\'post\' ref=\'uploadForm\' id=\'uploadForm\' encType=\'multipart/form-data\'><input type=\'file\' name=\'article\' accept=\'*.pdf\'><input type=\'submit\'></form>');
    //res.render('./head');
    res.send();


});


app.listen(3000, () => { console.log('listening....') });
