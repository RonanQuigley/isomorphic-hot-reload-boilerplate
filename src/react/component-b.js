import React from 'react';
import styled from 'styled-components';

const LoadMe = () => {
    return <Element>Component B</Element>;
};

const Element = styled.div`
    background: khaki;
`;

export default LoadMe;
