/**
 * Returns a context object that can be used
 * for inserting css into server side rendered react apps
 * @param {Set} set
 */
export function createServerContext(set) {
    return {
        insertCss: (...styles) =>
            styles.forEach(style => set.add(style._getCss()))
    };
}
