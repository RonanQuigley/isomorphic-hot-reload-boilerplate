import express from 'express';
import index from './server';
// for some reason if you comment the below import the program will crash
import handlebars from './server/src/handlebars';
import server from './server';

function createServer() {
    const app = express();
    app.engine("hbs", handlebars());
    app.set("view engine", "hbs");
    app.set("views", __dirname + '/server/src/handlebars/views/');
    if(process.env.IS_BUILD) {
        app.use(express.static(__dirname + '/build'));
    }    
    app.listen(process.env.PORT || 3000, 'localhost', function (err) {
        if (err) throw err;
        const addr = this.address();
        console.log('Listening at http://%s:%d', addr.address, addr.port);
    });
    app.use(server());
}

createServer();
