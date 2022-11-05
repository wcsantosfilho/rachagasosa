import React from 'react';
import { Box } from 'grommet';

export const AppBody = (props) => (
    <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        <Box 
            flex
            align='center'
            justify='center'
            {...props}
        />
    </Box>
  );

export default AppBody;