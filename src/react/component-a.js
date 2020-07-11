import React from "react";
import styled from "styled-components";

const LoadMe = () => {
  return (
    <Element>
      <Component />
    </Element>
  );
};

const Component = () => <p>Component</p>;

const Element = styled.div`
  background: yellow;
`;

export default LoadMe;
