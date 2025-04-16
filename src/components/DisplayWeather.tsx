import { AiOutlineSearch } from "react-icons/ai"
import { MainWrapper } from "./styles.module"
import { WiHumidity } from "react-icons/wi"
// import { WiDaySunny, WiDaySunnyOvercast, WiHumidity } from "react-icons/wi"
import { FiWind } from "react-icons/fi"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsCloudFog2Fill } from "react-icons/bs"
import { RiLoader2Fill } from "react-icons/ri"
import { TiWeatherPartlySunny } from "react-icons/ti"
import bgImage from "../assets/Clear.jpg"

function DisplayWeather() {
    interface WeatherDataProps {
        name: string,
        sys: {
            country: string
        },
        main: {
            temp: number
            humidity: number
            feels_like: number
        },
        weather: {
            main: string
        }[],
        wind: {
            speed: number
        }
    }


    const api_key = '510c82a4ee3cceb3708daca786ff3a6b'
    const api_url = `https://api.openweathermap.org/data/2.5/`

    const [currentWeather, setCurrentWeather] = useState<WeatherDataProps | null>(null)

    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_url}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
        const response = await axios.get(url)
        return response.data
    }
    const iconChanger = (weather: string) => {
        let iconElement: React.ReactNode
        let iconColor: string
        switch (weather) {
            case "Rain":
                iconElement = <BsFillCloudRainFill />
                iconColor = "#272829"
                break

            case "Clear":
                iconElement = <BsFillSunFill />
                iconColor = "#FFC436"
                break

            case "Clouds":
                iconElement = <BsCloudyFill />
                iconColor = "#102C57"
                break

            case "Mist":
                iconElement = <BsCloudFog2Fill />
                iconColor = "#279EFF"
                break

            case "Snow":
                iconElement = <TiWeatherPartlySunny />
                iconColor = "#4a90e2"
                break

            case "Thunderstorm":
                iconElement = <BsFillSunFill />
                iconColor = "#4a90e2"
                break

            default:
                iconElement = <RiLoader2Fill />
                iconColor = "#4a90e2"
                break
        }
        return (
            <span className="icon" style={{ color: iconColor }}>
                {iconElement}
            </span>
        )
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            Promise.all([fetchCurrentWeather(latitude, longitude)])
                .then(currentWeather => {
                    console.log(currentWeather[0]);
                    setCurrentWeather(currentWeather[0])
                });

        }
        )
    }, [])
    return (


        <MainWrapper>
            <div className="container" style={{
                background: `url(${bgImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="searchArea">
                    {/* <input type="text" placeholder="Enter a city" /> */}
                    <div className="searchCircle">
                        <AiOutlineSearch className="searchIcon" />
                    </div>
                </div>
                <div className="weatherArea">
                    <h2>{currentWeather?.name}</h2>
                    <span>{currentWeather?.sys.country}</span>
                    <div className="icon">
                        {iconChanger(currentWeather?.weather[0].main || "Unknown")}
                    </div>
                    <h1>{currentWeather?.main.temp.toFixed(0)}</h1>
                    <h3>Feels like {currentWeather?.main.feels_like.toFixed(0)}</h3>
                    <span>{currentWeather?.weather[0].main}</span>
                </div>
                <div className="bottomInfoArea">
                    <div className="humidityLevel">
                        <WiHumidity className="windIcon" />
                        <div className="humidInfo">
                            <h1>{currentWeather?.main.humidity}%</h1>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="wind">
                        <FiWind className="windIcon" />
                        <div className="humidInfo">
                            <h1>{currentWeather?.wind.speed} km/h</h1>
                            <span>wind speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    )
}

export default DisplayWeather