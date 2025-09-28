import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import dateFormat from 'dateformat';
import { MdLocationPin } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaCloudSunRain } from "react-icons/fa";
import { FaWind } from "react-icons/fa";

function GetWeather() 
{
    const [weather,setWeather]=useState({})
    const [city,setCity]=useState("")
    let apikey = import.meta.env.VITE_WEATHER_API_KEY;
    function getinfo() 
    {
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`).then((res1)=>{
            res1.json().then((res2)=>{
                console.log(res2);
                setWeather(res2)
                
            })
        })
        
    }
    function getdate() 
    {
        let now=new Date()
        return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
        
    }
  return (
    <div>
        <div className="c">
            <input type="text" placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)} />
            <button onClick={()=>getinfo()}><FaSearch/></button>
        </div>
        {
            weather && weather.weather?(
                <div className="w">
                    <div className="loc">
                        <MdLocationPin style={{marginRight:"10px"}}/>
                        {weather.name}
                        <p>({weather.sys.country})</p>
                    </div>

                    <div className="d">
                        <p>Date :{getdate()}</p>
                    </div>
                    <div className="t">
                        <h3><FaTemperatureHigh/>Current Temperature</h3>
                        <p>Temperature : {`${(weather.main.temp-273).toFixed(2)}`}&deg;C</p>
                        <p>It Feels Like : {`${(weather.main.feels_like-273).toFixed(2)}`}&deg;C </p>
                    </div>
                    <div className="cl">
                        <h3><FaCloudSunRain/> Clouds Condition</h3>
                        <p> {weather.weather[0].description}</p>
                    </div>
                    <div className="wd">
                        <h3><FaWind/> Wind</h3>
                        <p>Speed : {weather.wind.speed}</p>
                        <p>Degree : {weather.wind.deg}&deg;C</p>
                    </div>

                </div>
            ) :(<h3>Please Enter City</h3>)
        }
    </div>
  )
}

export default GetWeather