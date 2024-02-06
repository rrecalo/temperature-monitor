import './App.css';
import { useEffect, useState, useRef } from 'react';
import { getLastDayData} from './S3-Functions';
import Card from './Card';
import {BiRefresh} from 'react-icons/bi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DHT11Data = {
  timestamp: number,
  tempF: number,
  humidity: number,
}

function App() {
  const CHART_GRANULARITY = 1;
  const [refreshing, isRefreshing] = useState<Boolean>();
  const [timer, setTimer] = useState<number>();
  const [data, setData] = useState<DHT11Data[]>();
  const [labels, setLabels] = useState<number[]>();
  const [timezone, setTimezone] = useState<string>("UTC");
  const [chartData, setChartData] = useState<ChartData<'line'>>(
    {
      labels: labels,
      datasets:
      [
        {
        label: "Temperature (F)",
        data: data?.map((item) => item.tempF).filter((item, index) => index % 10 === 0) as number[],
        borderColor: 'rgba(120, 113, 108, 1)',
        backgroundColor: 'rgba(245, 245, 244, 1)',
        fill:true,
        tension:0.1,
        pointRadius: 0.5,
        
        },
      ]
    });

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins:{
      legend:{
        position: 'top',
        //disable toggling a dataset
        onClick: () => {return undefined}
      },
      title:{
        display: true,
        text: 'Past 24 Hours',
      }
    },
    maintainAspectRatio:false,
    scales:{
      x:{
        ticks:{
          maxTicksLimit: 15,
          minRotation:45,
          maxRotation:90,
        }
      }
    }

  };
  
  useEffect(()=>{
    refreshData();
  }, [])

  useEffect(()=>{
    timezone ?? refreshData();
  }, [timezone])
  
  
  useEffect(()=>{
    setChartData({
      labels: data?.map((item : DHT11Data)=> formatXLabels(item.timestamp)).filter((item : any, index : number) => index % CHART_GRANULARITY === 0),
      datasets:
      [
        {
        label: "Temperature (F)",
        data: data?.map((item) => item.tempF).filter((item, index) => index % CHART_GRANULARITY === 0) as number[],
        borderColor: 'rgba(120, 113, 108, 1)',
        backgroundColor: 'rgba(245, 245, 244, 1)',
        fill:true,
        tension:0.05,
        pointRadius: 2,
        
        },
      ]
    });
  },[data, timezone])


  useEffect(()=>{
    if(timer ? timer > 0 : false){
    setTimeout(() => {
      setTimer(val => val ? val-1 : 0);
    }, 1000);
    }
    else
      isRefreshing(false);
  },[timer]);

  function renderDisplayCards(){
    let tempF;
    let humidity;
    if(data){
      let latestData = data[data.length-1] as DHT11Data;
      tempF = latestData.tempF.toFixed(2);
      humidity = latestData.humidity;
    }

    return(
    <>
      <Card data={tempF || ""} dataLabel={"Temperature"}/> 
      <Card data={humidity || ""} dataLabel={"Relative Humidity"}/>
    </>)
  }

  function refreshData(){
    getLastDayData().then(res =>{
      //res = res.slice(res.length - 100, res.length);
      setLabels(res.map((item : DHT11Data)=> formatXLabels(item.timestamp)).filter((item : any, index : number) => index % 10 === 0));
      setData(res);
    })
  }
  
  function handleRefresh(){
    if(!refreshing){
      console.log("REFRESH DATA");
      isRefreshing(true);
      refreshData();
      setTimer(30);
    }
  }

  function formatUnixTimestamp(unixTimestamp : any) {
    if(!unixTimestamp){
      return `Loading...`;
    }
    const date = new Date(unixTimestamp * 1000);
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone,
        timeZoneName: 'short'
    });

    return formatter.format(date);
  }

  function formatXLabels(unixTimestamp : any) {
    if(!unixTimestamp){
      return `Loading...`;
    }
    const date = new Date(unixTimestamp * 1000);
    const formatter = new Intl.DateTimeFormat('en-US', {
        //weekday: 'short',
        day: '2-digit',
        month:'2-digit',
        //year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone
        //timeZoneName: 'short'
    });

    return formatter.format(date);
  }
  
  return (
    <div className="App mx-2 lg:mx-[10vw] mt-5">
      <div className='flex flex-col gap-4 sm:gap-8'>
        <div className='flex flex-row justify-center items-center gap-3'>
        <div className='text-stone-200 font-bold text-xl md:text-2xl text-center'>
          DHT11 Temperature Monitor
        </div>
        <div className={`${timer ? timer > 0 : false ? '' : 'cursor-pointer'} bg-stone-900 rounded-lg flex justify-center items-center align-middle w-12 h-12`} onClick={handleRefresh}>
          { !refreshing ? 
          <BiRefresh className='text-3xl text-stone-200' />
          : <p className='text-xl text-stone-300'>{timer}</p>
          }
        </div>
        <div className='bg-stone-900 rounded-lg flex justify-center items-center align-middle w-16 h-12' onClick={()=>{timezone === "UTC" ? setTimezone("EST") : setTimezone("UTC")}}> 
          <p className='text-lg font-light text-stone-300'>{timezone}</p>
        </div>
        </div>
        
        {data ? <div className='text-stone-200 font-light md:text-2xl text-center'>
          <span className='font-normal text-stone-400 pe-1'>Latest Reading  </span>| {formatUnixTimestamp(data[data.length-1]?.timestamp)}</div>
          : <></>
          }
        <div className='flex flex-col gap-2 sm:gap-10 justify-center items-center'>
          <div className='flex flex-row gap-5 justify-center items-center w-full'>
          {data ? renderDisplayCards() : <></>}
          </div>
          
          <div className='w-full sm:w-full h-[400px] sm:h-[400px]'>
            {chartData ? <Line data={chartData} options={options} className='h-full'/> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
