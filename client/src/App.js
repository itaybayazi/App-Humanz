import React from 'react';
import MyTable from './components/MyTable/MyTable';
import AddUser from './components/AddUser';
import './App.css';


function App() {
  
  return (
    
    <div className='App-div'>
      <h1  style={{textAlign: "center",}} > Users Table By Itay Bayazi</h1>
      <AddUser></AddUser>
      <MyTable></MyTable>
    </div>
    
  );
}

export default App;
