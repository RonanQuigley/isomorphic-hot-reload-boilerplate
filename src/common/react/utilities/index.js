/**improves debugging of higher order components
 * by getting the name of the component that is being wrapped
 */

export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
