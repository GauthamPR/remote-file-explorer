const multer = require('multer');
const diskFunctions = require('./disk.js');

module.exports = function(app) {
    
    var solution = {};

    var storage = multer.diskStorage({
        destination: async (req, file, cb)=>{
            var location = diskFunctions.renderFilePath(req.url);
            solution = await diskFunctions.checkForCollision(location, file.originalname);
            cb(null, solution.location);    
        },
        filename: (req, file, cb)=> {
            cb(null, solution.fileName);
        }
    })

    var upload = multer({storage: storage});
    
    app.post("/upload/*", upload.array('uploadFiles'), (req, res)=>{
        res.redirect('back');
    })
}  