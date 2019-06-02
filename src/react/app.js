import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import React from 'react';

const App = () => {
    return <Element>Hello Bar</Element>;
};

const Element = styled.div`
    color: cyan;
`;

export default hot(App);
