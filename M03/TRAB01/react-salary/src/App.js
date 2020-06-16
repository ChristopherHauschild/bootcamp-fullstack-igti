import React from 'react';

import Salary from './components/salary'

import css from './App.module.css'

function App() {
  return (
    <div className={`${css.back} container`}>
      <h3 className={css.title}>
        React Salary
      </h3>
      
      <Salary />
    </div>
  );
}

export default App;
