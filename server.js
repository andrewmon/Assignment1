var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if(parsedUrl.pathname == '/listings' && request.method == 'GET')
  {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(listingData);
  }
  else
  {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end("Bad gateway error");
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
   
  if(err)
  {
    throw err;
  }

   listingData = data;
   var server = http.createServer(requestHandler).listen(port);
   console.log('Server created')
});