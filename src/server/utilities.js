export function deepCopy(obj) {
    /* this is a deep copy so cannot use assign or spread */
    return JSON.parse(JSON.stringify(obj));
}
