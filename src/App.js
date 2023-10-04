import './App.css';
import { useEffect, useState } from 'react';
import data from './data.json';

function App() {
  const [files, setFiles] = useState();

  useEffect(()=>{
    //getData().then(data=>{console.log(data)});
    setFiles(data);
  },[]);


  return (
    <div className="App">
    
    </div>
  );
}

export default App;
