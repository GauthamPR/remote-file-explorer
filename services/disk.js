const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();

const collisionFolderName = "$_Collisions";

var rootDirectory = process.env.ROOT_DIRECTORY;
var hiddenFiles = process.env.HIDDEN.split(' ').map(elem => elem = elem.split('(_)').join(' '));
console.log(hiddenFiles);
var collisionLocation = path.join(process.env.COLLISIONFOLDERLOCATION, collisionFolderName);

module.exports ={

    //function to get all file names from a path (filePath)
    readFiles: function readFiles(filePath){
        const regexMms = /(.jpg)|(.JPG)|(.jpeg)|(.png)$/;
        var fileCategories = {
            directories: [],
            mms: []
        };
        return new Promise((resolve, reject)=> {
            fs.readdir(filePath, (err, fileNames)=> {
                if(err) {
                    reject(err);
                }
                else {
                    fileNames = fileNames.map(elem=> elem.split(' ').join('(_)'));//removing spaces for front-end smoothening
                    hiddenFiles.forEach((elem)=> {
                        fileNames=fileNames.filter((fileName)=> fileName!=elem);
                    })
    
                    fileNames.forEach((fileName)=> {
                        if(regexMms.test(fileName)){
                            fileCategories.mms.push(fileName);
                        }
                        else{
                            fileCategories.directories.push(fileName);
                        }
                    })
                    resolve(fileCategories);
                }
            })
        })
    },
    
    //to render physical file path in storage from http urls (for images)
    renderFilePath: function renderFilePath(url){
        url= url.split('/')
            .slice(3)
            .map((elem)=> {
                elem = elem.split('(_)').join(' ');
                return elem;
            })
        return path.join(rootDirectory, ...url);
    },
    
    //to check for collision while uploading files
    checkForCollision: function checkForCollision(reqLocation, reqFileName){
        return new Promise(async (resolve)=> {
            var collided = false;
            var solution = {
                location: reqLocation,
                fileName: reqFileName
            }
            var filesInReqLocation = await module.exports.readFiles(reqLocation);
            for (var category in filesInReqLocation){
                filesInReqLocation[category].forEach((fileName)=> {
                    if(fileName == reqFileName){
                        collided = true;
                        solution.location = collisionLocation;
                    }
                })
            }
            if(collided){
                filesInCollisionLocation = await module.exports.readFiles(collisionLocation);
                for (var collisionCategory in filesInCollisionLocation){
                    filesInCollisionLocation[collisionCategory].forEach((fileName)=> {
                        if(fileName == reqFileName){
                            solution.fileName = reqFileName.split('.').slice(0,1) + "_Collision" + Date.now() + "." + reqFileName.split('.').slice(1);
                        }
                    })
                }
            }
            resolve(solution);
        })
    }
}