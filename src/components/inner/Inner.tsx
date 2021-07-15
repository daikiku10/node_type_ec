import { FC } from 'react';
import { Container, Paper } from '@material-ui/core';

const Inner: FC = ({ children }) => {
  return( 
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        component="div"
        style={{ padding: 20, marginTop: 90 }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default Inner;