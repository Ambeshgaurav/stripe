

function uploadSingleFile(req, res) {
   
    
    var fileinfo = req.file;
    var title = req.body;
    if (fileinfo) {
        console.log(fileinfo, title);
        res.send({
            message: "succesfully uploaded",
            data: { fileinfo: fileinfo, text: title },
            status: 200
        })
    }
    else {
        console.log("error occurred or file format not correct");
        res.send({
            message: "error occurred or file format not correct",
            data: {},
            status: 404
        })
    }

}
function uploadMultipleFiles(req, res) {
    if (req.files) {
       var file=req.files.file
       console.log("-----file------",file);
    //    console.log("----filname---",file.name);
    //    console.log("----filetype---",file.type);
       
    
        
        res.send({
            message: "file sucessfully uploaded",
            data: {file:req.files},
            status: 200
        })
    }
    else {
        console.log("error occureed or file not in format");
        res.send({
            message: "error occurred file not in format",
            data: {},
            status: 404
        })
    }
}


module.exports = {
    uploadSingleFile: uploadSingleFile,
    uploadMultipleFiles: uploadMultipleFiles

}





























