import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Html extends PureComponent {
    static propTypes = {
        // optional in case you don't want to
        // render a react app and just need html
        app: PropTypes.string,
        styles: PropTypes.string.isRequired,
        title: PropTypes.string,
        scripts: PropTypes.array
    };

    setupScripts = scripts => {
        return scripts.map((script, index) => {
            return <script key={index} src={script} />;
        });
    };

    render() {
        const { styles, app, title, scripts } = this.props;
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
                        dangerouslySetInnerHTML={{ __html: styles }}
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
