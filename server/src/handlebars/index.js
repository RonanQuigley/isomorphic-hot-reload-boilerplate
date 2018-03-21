import expressHandlebars from "express-handlebars";

export default () => {
    return expressHandlebars.create({
        helpers: {
        },
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'
    }).engine;
}