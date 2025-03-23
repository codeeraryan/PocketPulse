import React from 'react';
import AppNavigation from './src/AppNavigation';
import { FirebaseProvider } from './src/context/FirebaseContext';
import StatProvider from './src/context/StatProvider';

export default function App() {

  return (
   
    <FirebaseProvider>
      <StatProvider>
     <AppNavigation/>
     </StatProvider>
    </FirebaseProvider>

  );
}


