var express = require('express');
var app = express();
var exec = require('child_process').exec, child;

child = exec('java -Djava.library.path=/path/to/lib -jar /path/to/jar',
  {maxBuffer: 1024 * 500},
  function (error, stdout, stderr){
    //console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
      console.log('exec error: ' + error);
    }
});

child.stdout.on('data', function(data) {
	console.log('stdout: ' + data);
});

process.stdin.pipe(child.stdin);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/cool', function(req, res) {
  console.log('received request to set cool mode');
  child.stdin.write("8 \n");
  res.end("success");
  //console.log("data: " + req.body);
});

app.get('/profile1', function(req, res) {
  console.log('received request to set cool mode');
  child.stdin.write("8 \n");
  res.end("success");
  //console.log("data: " + req.body);
});

app.get('/profile2', function(req, res) {
  console.log('received request to set cool mode');
  child.stdin.write("8 \n");
  res.end("success");
  //console.log("data: " + req.body);
});

app.get('/heat', function(req, res) {
  console.log('received request to set heat mode');
  child.stdin.write("9 \n");
  res.end("success");
  //console.log("req body: " + req.body);
});

app.get('/off', function(req, res) {
  console.log('received request to set off mode');
  child.stdin.write("10 \n");
  res.end("success");
  //console.log("req body: " + req.body);
});

app.get('/light_toggle', function(req, res) {
  console.log('received request to toggle light');
  child.stdin.write("4 \n");
  res.end("success");
})

app.post('/setCoolPoint', function(req, res) {
  console.log('---REQUEST BODY---');
  console.log(req.body);
  console.log(req.body.val);
  console.log(typeof req.body.val);
  console.log('------------------')
  child.stdin.write("11 \n");
  child.stdin.write(req.body.val.toString() + "\n");
  res.end("success");
  //child.stdin.write();
  //console.log("req body: " + req.body);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
