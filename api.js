var express = require('express');
var app = express();
var exec = require('child_process').exec, child;

//run xbee java application writing to stdout
child = exec('java -Djava.library.path=/path/to/lib -jar /path/to/jar',
  {maxBuffer: 1024 * 500},
  function (error, stdout, stderr){
    console.log('stderr: ' + stderr);
    if(error !== null){
      console.log('exec error: ' + error);
    }
});

child.stdout.on('data', function(data) {
	console.log('stdout: ' + data);
});

//pipe to stdin for write api calls
process.stdin.pipe(child.stdin);

//parser for api call payload
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/profile1', function(req, res) {
  console.log('received request to set cool mode');
  child.stdin.write("8 \n");
  res.end("success");
});

//set zigbee thermostat to heat mode
app.get('/heat', function(req, res) {
  console.log('received request to set heat mode');
  child.stdin.write("9 \n");
  res.end("success");
});

//set zigbee thermostat to cool mode
app.get('/cool', function(req, res) {
  console.log('received request to set cool mode');
  child.stdin.write("8 \n");
  res.end("success");
});

//set zigbee thermostat to off mode
app.get('/off', function(req, res) {
  console.log('received request to set off mode');
  child.stdin.write("10 \n");
  res.end("success");
});

//toggle zigbee light
app.get('/light_toggle', function(req, res) {
  console.log('received request to toggle light');
  child.stdin.write("4 \n");
  res.end("success");
})

//write cool setpoint to thermostat
app.post('/setCoolPoint', function(req, res) {
  console.log('---REQUEST BODY---');
  console.log(req.body);
  console.log(req.body.val);
  console.log(typeof req.body.val);
  console.log('------------------')
  child.stdin.write("11 \n");
  child.stdin.write(req.body.val.toString() + "\n");
  res.end("success");
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
