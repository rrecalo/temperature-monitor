import './App.css';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import getData from './S3-Functions';
import data from './data.json';
import Card from './Card';

function App() {
  const [files, setFiles] = useState();

  useEffect(()=>{
    //getData().then(data=>{console.log(data)});
    setFiles(data);
  },[]);

  function renderDisplayCards(){
    return(
    <>
      <Card data={files[0].tempF} dataLabel={"Temperature"}/> 
      <Card data={files[0].humidity} dataLabel={"Humidity"}/>
    </>)
  }

  function formatUnixTimestamp(unixTimestamp) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const date = new Date(unixTimestamp * 1000);
    
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = String(date.getUTCFullYear()).substring(2);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${dayOfWeek}, ${day}-${month}-${year} ${hours}:${minutes}:${seconds} UTC`;
  }
  
  return (
    <div className="App mx-2 lg:mx-[10vw] mt-[10vh]">
      <div className='flex flex-col gap-8'>
        <div className='text-stone-200 font-bold text-2xl text-center'>Live DHT11 sensor readings</div>
        
        {files ? <div className='text-stone-200 font-normal text-2xl text-center'>{formatUnixTimestamp(files[0].timestamp)}</div>
        : <></>
        }
        <div className='flex flex-col gap-10 justify-center items-center'>

        {files ? 
        renderDisplayCards()
        : <></>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
