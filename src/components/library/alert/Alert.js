import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert as MUIAlert } from '@mui/material';

import { Portal } from '../portal';
import AlertStyled from './Alert.styled';

export function Alert({ shown, variant, message, onHide }) {
  useEffect(() => {
    let timeout;
    if (shown) {
      timeout = setTimeout(() => {
        onHide();
      }, 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [shown, onHide]);

  if (!shown) return <></>;

  const props = { shown };

  return (
    <Portal>
      <AlertStyled {...props}>
        <main>
          <MUIAlert variant="filled" severity={variant} onClose={onHide}>
            {message}
          </MUIAlert>
        </main>
      </AlertStyled>
    </Portal>
  );
}
Alert.propTypes = {
  shown: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'error', '']),
  message: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};
