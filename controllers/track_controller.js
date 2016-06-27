var fs = require('fs');



//GET - Retorna una cancion por su nombre
exports.findTrackByName = function(req, res){
    var findURL = req.params.name;

    //recogemos el fichero con ese nombre dentro del NAS
    //PRODUCCION: var urlNAS = "../mnt/nas/";
    //var urlNAS = "../mnt/nas/";
    //var newURL = urlNAS+findURL;

    //mando la cancion que se encuentra en esa ruta:
    //res.sendFile(findURL,{root: '../mnt/nas'});
    res.sendFile('/mnt/nas/'+findURL);
};


//POST - Inserta una nueva cancion en la DB
exports.addTrack = function(req, res){
    var urlNAS = "/mnt/nas/";

    if (req.method == 'POST') {
        var fileName = '';
        var mp3File = '';
        var mp3_file;
        var tempName = '';

        var body = '';
        var contador = 0;
        req.on('data', function (data) {
            body += data;

            if (contador == 0){
                var stringData = data.toString();

                stringData = stringData.substr(stringData.indexOf('filename')+13);
                
                stringData = stringData.substr(0,stringData.indexOf('.')+4);
    
                filename = stringData;

                var random = Math.floor((Math.random() * 100) + 1);

                console.log("FILENAME: "+filename);
                if (fileName == ""){
                    filename = ".mp3";
                }

                tempName = new Date().getTime()+random+'_'+filename;
                mp3File = urlNAS + tempName;

                mp3_file = fs.createWriteStream(mp3File);
                mp3_file.write(data);
                contador++;
            }else{
                mp3_file.write(data);
            }
        });
        req.on('end', function () {
            console.log("TERMINADO");

            mp3_file.end();
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(tempName);
        });

    }
};


//DELETE - Borramos una cancion por su nombre
exports.deleteTrackByName = function(req,res){
    var urlNAS = "/mnt/nas/";
    var findURL = req.params.name;
    var newURL = urlNAS+findURL;

    //borramos el fichero en esa ruta
    var fs = require('fs');
    fs.unlinkSync(newURL);
    res.status(200);
    console.log("DELETED:"+findURL);
};