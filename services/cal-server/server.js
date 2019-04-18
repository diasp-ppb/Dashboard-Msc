const DATA_PATH = "./data";
const RAW_DATA_PATH = DATA_PATH + "/raw_data";
const ZIPPED_DATA_PATH = DATA_PATH + "/zipped_data";

let fs = require("fs");




//READ FOLDER

const readRawData = function () {
    fs.readdir(RAW_DATA_PATH, (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });
}

//GENERATE JSON

//GENERATE ZIPS

const generateZips = function () {

}

const makeDir = function (path , cb) {
    fs.mkdir(path, {recursive: true},  (err,folder) => {
        if(err) {
            console.warn("makeDir ", "path:"+ path, err);
             cb(false);
        }
        else{
            console.log("Folder create at " +  path);
            cb(true);
        }

    })
}

readRawData();

makeDir(ZIPPED_DATA_PATH, (result) => {
    if(result)
        {

        }
});
