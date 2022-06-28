import styled, { keyframes } from 'styled-components';

const enter = keyframes`
  0% {
    transform: translateY(0) scale(0);
  }
  80% {
    transform: translateY(1.5rem) scale(1.2);
  }
  100% {
    transform: translateY(2rem) scale(1);
  }
`;

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  > main {
    display: flex;
    justify-content: center;
    animation: ${enter} 300ms forwards;
  }
`;
