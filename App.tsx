import React, { useEffect } from 'react';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <MainStack />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
