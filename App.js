import React from 'react';
import AppNavigation from './src/AppNavigation';
import { FirebaseProvider } from './src/context/FirebaseContext';

export default function App() {

  return (
   
    <FirebaseProvider>
     <AppNavigation/>
    </FirebaseProvider>

  );
}


