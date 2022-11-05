import React from 'react';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import AppBar from './components/appBar';
import AppBody from './components/appBody';
import AppForm from './components/appForm';
import AppMap from './components/appMap';

const gasosaTheme = { 
  global: {
    colors: {
      brand: '#228BE6',
      backbrand: '#eeeeee'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
      },
    },
  };

const App = () => {
  return (
    <Grommet theme={gasosaTheme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill background="backbrand">
            <AppBar>Rachagasosa</AppBar>
            <AppBody>
              <AppForm />
              <AppMap />
            </AppBody>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
