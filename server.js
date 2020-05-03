const http = require('http');
const { parse } = require('url');
const fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    
    var parsedUrl = parse(req.url);
    var imageExt = 'svg png jpg jpeg webp'.split(' ');
    var videoExt = 'mp4 mov swf 3gp wmv flv ogv mpeg aaf mod'.split(' ');
    
    if(parsedUrl.pathname === '/') {

        fs.createReadStream('./index.html').pipe(res);

    }else if(parsedUrl.pathname.includes('html')) {
       
        res.setHeader('Content-Type','text/html');
        fs.createReadStream('.' +req.url).pipe(res)
        
        
    } else if(parsedUrl.pathname.includes('css')) {

        res.setHeader('Content-Type','text/css'); 
        fs.createReadStream('.' +req.url).pipe(res)

    } else {

        for(var i = 0; i < videoExt.length; i++) {
            
            if(parsedUrl.pathname.endsWith(imageExt[i])) {

                res.setHeader('Content-Type','images/*');
                fs.createReadStream('.' +req.url).pipe(res);
                break;

            } else if(parsedUrl.pathname.endsWith(videoExt[i])) {

                res.setHeader('Content-Type','video/*');
                fs.createReadStream('.' +req.url).pipe(res);
                break;
            }
        }

    }
}

server.listen(3000, ()=>console.log('Server running on port 3000'));

