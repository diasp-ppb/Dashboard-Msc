const DATA_PATH = "./data";
const RAW_DATA_PATH = DATA_PATH + "/raw_data";
const ZIPPED_DATA_PATH = DATA_PATH + "/compressed_data";
const EDGE_TAG = "_edges_";
const NODE_X_Y_TAG = "_nodes_X_Y_";
const NODE_LAT_LONG_TAG = "nodes_lat_lon_";
const TAG_TAG= "_tags_";

let fs = require("fs");
let targz = require('targz');
var async = require("async");



const readRawData = function () {
  
    const generateCompressedFile = function (fileName) {
        let fileinput = RAW_DATA_PATH + "/" + fileName;
        let fileOutput = ZIPPED_DATA_PATH + "/" + fileName +'.tar.gz';
        
        targz.compress({
            src: fileinput,
            dest: fileOutput
        }, function(err){
            if(err) {
               console.log(err);
            } else {
                console.log(fileName + " compressed!");
            }
        });
    }   

    const generateJson = function (folderRoot, folderCurrent) {
        let json =  {
            edges: [],
            nodes: [],
        }

        const generateFilePath = function (path, folderRoot, folderCurrent, tag) {
            return path + '/' + folderRoot +  tag + folderCurrent + ".txt";
        }

        //input stream // line processing function
        const readLines = function (input, func) {
            var remaining = '';
          
            input.on('data', function(data) {
              remaining += data;
              var index = remaining.indexOf('\n');
              while (index > -1) {
                var line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                func(line);
                index = remaining.indexOf('\n');
              }
            });
          
            input.on('end', function() {
              if (remaining.length > 0) {
                func(remaining);
              }
            });
        }
        const readEdges = function (folder, cb) {
            let path= generateFilePath(RAW_DATA_PATH, folderRoot, folder, EDGE_TAG );

            let input = fs.createReadStream(path);

            const lineProcessing = function (data, cb) {
               // console.log(data); 
                cb();
            }

            readLines(input, function(data, endend)  {
                lineProcessing(data, function () {

                })
            });

        };
        const readNodesXY = function (path, cb) {
            cb();
        };
        const readNodesLatLong = function (path, cb) {
            cb();
        }; 
        const readTags = function (path, cb) {
            cb();
        };
        
        let folderRootPath = RAW_DATA_PATH + "/" + folderRoot ;

        fs.readdir(folderRootPath, (err, folders) => {
            if(!err) {
                folders.forEach(folder => {
                    
                let path = folderRootPath + "/" + folder;
    
                if(fs.lstatSync(path).isDirectory())  {
                  
                  let nodesXYFile = generateFilePath(path, folderRoot, folder, NODE_X_Y_TAG );
                  let nodesLatLongFile = generateFilePath(path, folderRoot, folder, NODE_LAT_LONG_TAG );
                  let tags = generateFilePath(path, folderRoot, folder, TAG_TAG );


                  async.series (
                     [
                       function (cb) {
                        readEdges(folder,cb);
                       },
                       function(cb) {
                        readNodesXY(nodesXYFile,cb)
                       },
                       function(cb) {
                        readNodesLatLong(nodesLatLongFile,cb)
                       },
                       function(cb) {
                        readTags(tags,cb);
                       }
                     ], function(err) {
                           if(err) {
                               console.log(err);
                           }
                           else {
                               console.log("JSON Object Generacted");
                           }
                       }
                    )
                }
            })

            }
            else {
                console.log("readRawData: " + err);
            }
        });
       
    }


    fs.readdir(RAW_DATA_PATH, (err, folders) => {
        if(!err) {
            folders.forEach(folder => {
                
            let path = RAW_DATA_PATH + "/" + folder;

            if(fs.lstatSync(path).isDirectory() &&  folder !== ".gitignore" )
                console.log(folder);
                generateCompressedFile(folder);
                generateJson(folder); 
            })
        }
    });
}


const makeDir = function (path , cb) {
    fs.mkdir(path, {recursive: true},  (err,folder) => {
        if(err) {
            console.warn("makeDir ", "path:"+ path, err);
             cb(true);
        }
        else{
            console.log("Folder create at " +  path);
            cb(false);
        }

    })
}

readRawData();

makeDir(ZIPPED_DATA_PATH, (result) => {
    if(result)
        {

        }
});
