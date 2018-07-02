require('@babel/register');

/* 
    babel register will attempt to load modules 
    inside of js files that it doesn't support.
    As we want our webpack loaders to load them, 
    provide babel with effectively an empty module 
    when it comes across the unloadable extensions
*/

const extensions = ['scss', 'graphql'];

extensions.forEach(ext => (require.extensions['.' + ext] = () => {}));
