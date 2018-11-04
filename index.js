var express = require('express');
var app = express();
app.use('/' , (req,res) => {
    res.send('hello world');
});
app.listen(3001,() => {
    console.log('Listening on port 3000');
});