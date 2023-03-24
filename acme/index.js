const http = require('http');
const fs = require('fs');
//var url = require('url');
const path = require('path');

// tipos de archivos a leer
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
};

// error de página no encontrada
function error404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404: Pagina no encontrada');
    response.end();
}

// obtener el path del archivo a leer en base a la url de la página actual
const requestListener = (req, res) => {
    const { url } = req;
    const filePath = `../public${url}`;
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'text/plain';

    // debug(?😑
    console.log(filePath)
    console.log(extname)
    console.log(contentType)
    console.log(url)

    // condicional para renderizar el index cuando se cargue el servidor por primera vez
    if (String(url) == "/") {
        fs.readFile("../public/index.html",function(err,data){
            if(err){ //en caso de error
                error404(res)
            }
            res.writeHead(200,{'Content-Type':'text/html'}); //se envía el código 200 de HTTP y se especifica el tipo de contenido a leer.
            res.write(data); //data viene a ser el buffer o el contenido leído del archivo a leer. Dicho contenido proveniente del buffer, se escribe en la respuesta o response del servidor al front.
            return res.end(); //el contenido leído se muestra en el front
        })
    } else { // se renderizan las páginas correspondientes
        fs.readFile(filePath, (err, content) => {
            if (err) {
                error404(res)
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        })
    } 

}

const server = http.createServer(requestListener);

server.listen(8080, () => {
    console.log("Server on port 8080")
})