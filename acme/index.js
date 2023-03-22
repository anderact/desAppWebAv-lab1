var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((req,res)=>{
    var u = url.parse(req.url,true); //obtiene la ruta actual en el servidor
    var filename = "."+u.pathname; //extrae el nombre de la página (nombre del archivo html)
    fs.readFile(filename,function(err,data){
        if(err){ //en caso de error
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end("Page not found");
        }
        res.writeHead(200,{'Content-Type':'text/html'}); //se envía el código 200 de HTTP y se especifica el tipo de contenido a leer.
        res.write(data); //data viene a ser el buffer o el contenido leído del archivo a leer. Dicho contenido proveniente del buffer, se escribe en la respuesta o response del servidor al front.
        return res.end(); //el contenido leído se muestra en el front
    });
}).listen(8080);
console.log("Server on port 8080")