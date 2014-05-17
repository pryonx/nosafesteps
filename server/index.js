/**
 * New node file
 */

module.exports = function(app) {

    var http =require('http');
    var console = require('console');
    var io = require('socket.io');
    var IDarray=[];


    var server=http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
    });

    var sio=io.listen(server);

    sio.sockets.on('connection', function (socket) {
        socket.emit('news', { id: socket.id });


        socket.on('id', function (data) {
            console.log(data);
            IDarray[data.myID+","+data.mateID]=data.posX+","+data.posY;

            if(IDarray[data.mateID+","+data.myID])socket.emit('position', { position: IDarray[data.mateID+","+data.myID] });
        });

    });






    return server;
}