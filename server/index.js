/**
 * New node file
 */

module.exports = function(app) {

    var http =require('http');
    var console = require('console');
    var io = require('socket.io');



                        var server=http.createServer(app).listen(app.get('port'), function(){
                            console.log('Express server listening on port ' + app.get('port'))
                        });

                        var sio=io.listen(server);

                        sio.sockets.on('connection', function (socket) {
                            socket.emit('news', { hello: 'world' });
                            socket.on('my other event', function (data) {
                                console.log(data);
                            });
                        });




    return server;
}