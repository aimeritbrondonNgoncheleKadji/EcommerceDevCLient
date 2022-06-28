import styled from 'styled-components';

export default styled.div`
  > li {
    display: flex;
    list-style: none;

    :not(:last-child) {
      margin-bottom: 1.5rem;
    }

    > div {
      flex: 1;
      display: flex;

      > * {
        :not(:last-child) {
          margin-right: 1.5rem;
        }
      }
    }
  }
`;
