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
        document.getElementById('css').remove();
    }

    getChildContext() {
        return { ...this.props.context };
    }

    render() {
        return this.props.children;
    }
}
