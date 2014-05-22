/**
 * New node file
 */

module.exports = function(app) {

    var http =require('http');
    var console = require('console');
    var io = require('socket.io');
    var IDarray=[];
    var READYarray=[];


    var server=http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
    });

    var sio=io.listen(server);

    sio.sockets.on('connection', function (socket) {
        socket.emit('news', { id: socket.id });


        socket.on('id', function (data) {
            
            IDarray[data.myID+","+data.mateID]=data.posX+","+data.posY;

            if(IDarray[data.mateID+","+data.myID]){
                socket.emit('position', { position: IDarray[data.mateID+","+data.myID] });
            }
            if((READYarray[data.mateID+","+data.myID]==true)&&(READYarray[data.myID+","+data.mateID]==true)){
                socket.emit('mready', { ready: true });
                READYarray[data.mateID+","+data.myID]=false;
                READYarray[data.myID+","+data.mateID]=false;
            }

        });

        socket.on('ready', function (data) {
            READYarray[data.myID+","+data.mateID]=true;
        });



    });
    return server;
}
