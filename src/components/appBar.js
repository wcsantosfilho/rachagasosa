import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Car } from 'grommet-icons';

export const AppBar = (props) => {
  return (
    <>
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', verticall: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}>
        <Heading level='3' margin='none' {...props}/>
        <Button icon={<Car />}/>
      </Box> 
    </>
  );
};

export default AppBar;