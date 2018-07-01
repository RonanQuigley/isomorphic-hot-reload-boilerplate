import { hot } from 'react-hot-loader';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './styles.scss';
import React from 'react';

@hot(module)
@withStyles(styles)
export default class App extends React.Component {
    render() {
        return <div className={styles.react}>I am a react app</div>;
    }
}
