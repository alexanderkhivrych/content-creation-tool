import styled from 'styled-components';

export const StyledImageEditPreviewCanvas = styled.canvas<{
  $loading: boolean;
}>`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: ${({ $loading }) => ($loading ? 'none' : 'block')};
`;
