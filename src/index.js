import express from 'express';
import router from './server';
const app = express();

if(process.env.NODE_ENV === 'development'){
    // dont' try to import this; issue with webpack bundle
    app.use(require('./dev').default);
}
else{
    app.use(
        router()
    );
}

app.listen(3000, () => {
    console.log('3000')
});
