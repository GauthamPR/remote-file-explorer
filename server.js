const diskService = require('./services/disk.js');
const upload = require('./services/upload.js');


const express = require('express');
const dotenv = require("dotenv").config();

const app = express();

app.use(express.static(__dirname + '/build/public'));

let hiddenFiles = [process.env.HIDDEN];

upload(app);

/*app.all('/*',(req, res, next)=> {
    console.log("Requested URL: ", req.url);
    next();
})*/

app.get('/info/:name', (req, res)=>{
    try{
        if(req.params.name == 'rootFolder'){
            let rootFolder = process.env.ROOT_DIRECTORY.split('\\').pop();
            res.json({rootFolder: rootFolder})
        }else{
            throw 'INVALID PARAM NAME';
        }
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
})
app.get('/getDirectory/*', (req, res)=> {
    diskService
    .readFiles(diskService.renderFilePath(decodeURIComponent(req.url)))
    .then(files=>{
        res.send(files)
    })
    .catch(err=>{
        res.send({error: err.message.match(/:\s(.*),/)[1]});
    })
})

app.get('/getImages/*',async (req, res)=> {
    res.sendFile(await diskService.renderFilePath(decodeURIComponent(req.url)));
})

app.get('/*', (req, res)=> {
    res.sendFile(__dirname + '/build/views/index.html');
})
/*

app.get('/Home*', (req, res)=> {
    let flag = 0;
    hiddenFiles.forEach((hiddenFile)=> {
        if(flag == 1){
            return;
        }
        req.url.split('/').forEach((elem)=> {
            if(elem.toUpperCase() == hiddenFile.toUpperCase() && hiddenFile != ""){
                flag = 1;
                res
                    .type('txt')
                    .send("Access Denied");
                return;
            }
        })
    })
    flag == 0 ? res.sendFile(__dirname + '/build/views/index.html') : flag = 0;
})
*/
app.use((req, res)=> {
    res.status(404)
        .type('txt')
        .send('Not Found');
})

app.listen(process.env.PORT || 3000, ()=> console.log('listening on port', process.env.PORT));
