const _ = require('lodash');
const express = require('express');
const Joi = require('joi');
const formidable = require('formidable');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');

const router = express.Router();


router.get('/', function (req, res) {
    var filesPath = path.join(__dirname, '/../uploads/');
    console.log("\n"+filesPath);
    fs.readdir(filesPath, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(function (file) {
            fs.stat(filesPath + file, function (err, stats) {
                if (err) {
                    console.log(err);
                    return;
                }

                var createdAt = Date.parse(stats.ctime),
                    days = Math.round((Date.now() - createdAt) / (1000*60*60*24));

                if (days > 1) {
                    fs.unlink(filesPath + file);
                }
            });
        });
    });
    res.sendFile(path.join(__dirname, '/../views/index.html'));
});


/*
 * Uploads images in "upload" folder
 *
 * IMPORTANT: there is no auto delete function implemented right now for deleting old images
*/
router.post('/upload_photos', async function (req, res) {
    var photos = [],
        form = new formidable.IncomingForm();

    // Upload directory for the images
    form.uploadDir = path.join(__dirname, '/../uploads');

    // Invoked when a file has finished uploading.
    form.on('file', async function (name, file) {
        console.log("FORM ON file");
        // Allow only 1 file to be uploaded.
        if (photos.length === 1) {
            fs.unlink(file.path);
            return true;
        }

        var buffer = null,
            type = null,
            filename = '';

        buffer = readChunk.sync(file.path, 0, 262);
        type = await fileType.fromBuffer(buffer);
        console.log(type.ext);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            // Assign new file name
            filename = Date.now() + '-' + file.name;

            // Move the file with the new file name
            fs.rename(file.path, path.join(__dirname, '/../uploads/' + filename),(err)=>{
                if(err){
                    console.log(err);
                }
            });

            // Add to the list of photos
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'uploads/' + filename
            });
            console.log(photos)
            res.status(200).json(photos);
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path,(err)=>{
                console.log(err);
            });
        }
    });

    form.on('error', function(err) {
        console.log("FORM ON error");
        res.status(500).json(photos);
    });

    form.on('end', function() {
        console.log("FORM ON end");
    });

    form.parse(req, function (err, fields, files) {
        console.log("FORM ON parse");
    });
});


/*
* @return
* Array of objects
*     Gray Image: Location of CNN input image
*     Output Image: Location of Original image with keypoints plotted
*
* All Detected Faces: Location of Original Image where all faces surronded by bounding boxes
*
* IMPORTANT: there is no auto delete function implemented right now for deleting old images
*/
router.post('/detectKeypoints', async function (req, res) {
    let schema = Joi.object({
        filePath: Joi.string().min(5).max(255).required()
    });
    let {error} = await schema.validate(req.body);
    if(error){
        return res.status(400).json({"response":"Error in validation of schema"});
    }
    let filePath = path.join(__dirname,'../'+req.body.filePath);


    let resultArray = null;
    let statusCode = 200

    //create a child process and pass image location as argument
    const python = spawn('python', [path.join(__dirname,'../python_models/main.py'),'-loc',filePath.toString()]);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        console.log(data.string);
        resultArray = JSON.parse(data.toString());
    });
    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        //put status code to 500 to indicate internal issues, as model realted issues cannot be shown at front end
        statusCode = 500;
    });

    // make sure child process is closed and then return back result
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        return res.status(statusCode).json({"result":resultArray});
    });

    /*
    // If Python module/model checkpoint is not ready, try passing some static images just to check the front end views
    resultArray = [{"Detected Faces":"../public/images/album1/Output_All_Faces_1608357713.9098601.jpg",
                        "Gray Plot":"../public/images/album1/Gray_Plot_1608357713.0404646.jpg",
                        "Output Plot":"../public/images/album1/Output_Plot_1608357713.0404646.jpg"}];

    return res.status(200).json({"result":resultArray});
    */
});




module.exports = router;