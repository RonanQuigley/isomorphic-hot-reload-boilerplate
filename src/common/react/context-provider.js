import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ContextProvider extends PureComponent {
    static childContextTypes = {
        insertCss: PropTypes.func
    };

    static propTypes = {
        children: PropTypes.node.isRequired,
        context: PropTypes.object.isRequired
    };

    componentDidMount() {
        /* 
            once the app is mounted 
            we can remove the old css 
            that was injected by the server
        */
        document.getElementById('css').remove();
    }

    getChildContext() {
        return { ...this.props.context };
    }

    render() {
        return this.props.children;
    }
}
