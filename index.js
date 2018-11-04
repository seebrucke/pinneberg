var express = require('express');
var app = express();
app.use('/' , express.static('index.html'));
app.use('/about',express.static('about.html'));
app.use('/contact',express.static('contact.html'));
app.use('/german',express.static('german'));
app.use('/arabi',express.static('arabi'));
app.use('/farsi',express.static('farsi'));
app.listen(3000,() => {console.log('listening....')});