const DATA_PATH = "./data";
const RAW_DATA_PATH = DATA_PATH + "/raw_data";
const ZIPPED_DATA_PATH = DATA_PATH + "/compressed_data";
const EDGE_TAG = "_edges_";
const NODE_X_Y_TAG = "_nodes_X_Y_";
const NODE_LAT_LONG_TAG = "_nodes_lat_lon_";
const TAG_TAG= "_tags_";

let fs = require("fs");
let targz = require('targz');
let async = require("async");

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


        const readEdges = function (rootPath, folder, cb) {
            let path= generateFilePath(rootPath, folderRoot, folder, EDGE_TAG );

            let input = fs.createReadStream(path);
            
            let edges = [];
            let lineCount = 0;

            const lineProcessing = function (data, cb) {
                if(lineCount != 0 && !data.includes("oid") && !data.includes("size")) {
                  let result = data.split(", ")
                  let n1 = result[0].split("(")[1];      
                  let n2 = result[1].split(")")[0]; 
                  edges.push({n1,n2});
                }  
                lineCount++;
                cb();
            }

            readLines(input, function(data)  {
                lineProcessing(data, function() {});
            });

            input.on('close', function() {
                    console.log("Called ");
                    cb(null, edges);
              });
        };

        const readNodesXY = function (rootPath, folder, cb) {
            let path= generateFilePath(rootPath, folderRoot, folder, NODE_X_Y_TAG );

            let input = fs.createReadStream(path);
            
            let nodes = [];
            let lineCount = 0;

            const lineProcessing = function (data) {
                if(lineCount != 0 && !data.includes("oid") && !data.includes("size")) {
                  let result = data.split(", ");
                  let nodeId = parseInt(result[0].split("(")[1]);      
                  let x = result[1];
                  let y = result[2].split(")")[0];
                  nodes.push({nodeId, x, y});
                }  
                lineCount++;
            }

            readLines(input, function(data)  {
                lineProcessing(data, function (){});
            });

            input.on('close', function() {
                    cb(null,nodes);
              });
        };
        
        const readNodesLatLong = function (rootPath, folder, cb) {
            let path= generateFilePath(rootPath, folderRoot, folder, NODE_LAT_LONG_TAG );

            let input = fs.createReadStream(path);
            
            let nodes = [];
            let lineCount = 0;

            const lineProcessing = function (data) {
                if(lineCount != 0 && !data.includes("oid") && !data.includes("size")) {
                  let result = data.split(", ")
                  let nodeId = parseInt(result[0].split("(")[1]);      
                  let lat = result[1];
                  let long = result[2].split(")")[0];
                  nodes.push({nodeId, lat, long});
                }  
                lineCount++;
            }

            readLines(input, function(data)  {
                lineProcessing(data, function (){});
            });

            input.on('close', function() {
                    cb(null,nodes);
              });
        }; 
        const readTags = function (rootPath, folder, cb) {
            let path= generateFilePath(rootPath, folderRoot, folder, TAG_TAG );

            let input = fs.createReadStream(path);
            
            let tags = [];
            let lineCount = 0;
            let ignoreLine = false;
            let name = "";
            let nodes = [];

            const pushData = function() {
                if(nodes.length > 0) {
                 tags.push({name, nodes});
                 nodes = [];
                }
            }

            const lineProcessing = function (data) {
                if(lineCount !== 0 && !data.includes("oid") && !data.includes("size")) {
                   if(ignoreLine){
                       ignoreLine = false;
                   } else if (isNaN(data)) {
                       ignoreLine = true;
                       pushData();
                       name = data;
                   } else {
                       let nodeID = parseInt(data);
                       nodes.push(nodeID);
                   }
                }  
                lineCount++;
            }

            readLines(input, function(data)  {
                lineProcessing(data, function (){});
            });

            input.on('close', function() {
                pushData();        
                cb(null,tags);
              });
        };
        
        let folderRootPath = RAW_DATA_PATH + "/" + folderRoot ;

        fs.readdir(folderRootPath, (err, folders) => {
            if(!err) {
                folders.forEach(folder => {
                    
                let path = folderRootPath + "/" + folder;
    
                if(fs.lstatSync(path).isDirectory())  {

                  async.series (
                     [
                       function (cb) {
                        readEdges(path,folder,cb);
                       },
                       function(cb)  {
                        readNodesXY(path, folder, cb);
                       },
                       function(cb) {
                        readNodesLatLong(path, folder,cb);
                       },
                       function(cb) {
                        readTags(path, folder, cb);
                       }
                     ], function(err, results) {
                           if(err) {
                               console.log(err);
                           }
                           else {
                               //TODO mergeResults
                               let edges = results[0];
                               let nodesXY = results[1];
                               let nodesLatLong = results[2];
                               let tags = results[3];
                               let nodes = [];
                               
                                nodesXY.map( item => {
                                        let node = nodesLatLong.find( function (element) {
                                          return element.nodeId == item.nodeId;
                                        })

                                        node.x = item.x;
                                        node.y = item.y;
                                        
                                        node.tags = [];

                                        tags.forEach( function(element) {
                                            if(element.nodes.indexOf(node.nodeId) > -1)
                                                node.tags.push(element.name);
                                        }) || [];

                                        nodes.push(node);
                                        

                                    }   
                                )                       
                                
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
               // generateCompressedFile(folder);
                generateJson(folder); 
            })
        }
    });
}


const makeDir = function (path , cb) {
    if(!fs.existsSync(path))
        fs.mkdir(path, {recursive: true},  (err,folder) => {
            if(err) {
                console.warn("makeDir ", "path:"+ path, err);
                cb(true);
            }
            else {
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
