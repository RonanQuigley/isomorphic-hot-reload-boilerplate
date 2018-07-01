export function createClientContext() {
    return {
        // Enables critical path CSS rendering
        // this allows us to update the client side css
        // https://github.com/kriasoft/isomorphic-style-loader
        // https://github.com/kriasoft/react-starter-kit/blob/master/src/client.js
        insertCss: (...styles) => {
            const removeCss = styles.map(x => x._insertCss());
            return () => {
                removeCss.forEach(f => f());
            };
        }
    };
}
