import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 2.5rem;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > * {
    :not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`;
