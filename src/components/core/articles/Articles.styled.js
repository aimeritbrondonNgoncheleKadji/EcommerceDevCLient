import styled from 'styled-components';

export default styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > main {
    display: grid;
    grid-template-columns: ${getGripTemplateColumns};
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

function getGripTemplateColumns({ viewMode }) {
  return { shrinked: 'repeat(3, 1fr)', expanded: 'repeat(4, 1fr)' }[viewMode];
}
