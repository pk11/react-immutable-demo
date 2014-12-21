var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use('/', express.static(__dirname));
app.use(bodyParser());

app.listen(3000);
