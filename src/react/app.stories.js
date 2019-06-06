import React from 'react';
import { storiesOf } from '@storybook/react';
import App from './app';
import { Button } from '@storybook/react/demo';

storiesOf('Button', module)
    .add('with text', () => <Button>Hello Button</Button>)
    .add('with emoji', () => (
        <Button>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯
            </span>
        </Button>
    ))
    .add('with app', () => <App />);
