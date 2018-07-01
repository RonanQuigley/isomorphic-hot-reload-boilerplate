import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Html extends PureComponent {
    static propTypes = {
        app: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        title: PropTypes.string,
        scripts: PropTypes.string
    };

    setupScripts = scripts => {
        return scripts.map((script, index) => {
            return <script key={index} src={script} />;
        });
    };

    render() {
        const { style, app, title, scripts } = this.props;
        const isDev = process.env.NODE_ENV === 'development' ? true : false;
        return (
            <html lang="en">
                <head>
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>{title ? title : 'Document'}</title>
                    <style
                        id="css"
                        dangerouslySetInnerHTML={{ __html: style }}
                    />
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
                    {this.setupScripts(scripts)}
                    {isDev && <script src="./dev.js" />}
                </body>
            </html>
        );
    }
}
