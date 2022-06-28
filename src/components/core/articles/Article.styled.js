import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 0.5rem;

  > header {
    height: 10rem;
    padding: 1rem;
    display: flex;
    justify-content: center;

    > img {
      display: inline-block;
      width: 100%;
      object-fit: contain;
    }
  }

  > main {
    padding: 0 1rem;
    text-align: center;
  }

  > footer {
    padding: 1rem;
    display: flex;
    justify-content: center;

    > button {
      :first-child {
        margin-right: 1rem;
      }
    }
  }
`;
