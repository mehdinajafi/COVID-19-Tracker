import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import '../styles/Charts.css';

const Charts = () => {
    // Timeline state is an array of {total cases, total deaths, date and total recovered} in a day
    // The information of this array is constantly received from this api:
    // https://pomber.github.io/covid19/timeseries.json
    const [timeline, setTimeline] = useState([])

    // These three arrays are for filtering charts
    // The country state is the country that the user wants to see its status
    const [country, setCountry] = useState("US")
    // The countries state are countries that map in select tag to user choose
    const [countries, setCountries] = useState([])
    // The daysShown is days that user want to see
    const [daysShown, setDaysShown] = useState(-1)

    useEffect(() => {
        axios.get('https://pomber.github.io/covid19/timeseries.json')
        .then((res) => {
            setTimeline(res.data[country])
        })
    }, [country])

    useEffect(() => {
        axios.get('https://pomber.github.io/covid19/timeseries.json')
            .then(res => {
                setCountries(
                    // Sort data by country's name
                    Object.keys(res.data).sort((a, b) => a - b)
                )
            }) 
    }, [])
    // Filter the chart based on daysShown's state that choose in select tag
    const filteredByDate = timeline.filter((i, index) => {
        return index>daysShown
    })
    // These two functions drop that value into the corresponding state 
    // whenever the value of the two select tags changes
    const onChangeFilterCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeFilterDays = (e) => {
        setDaysShown(Number(e.target.value))
    }
    return (
        <section className="charts">
            <div className="charts-header">
                <h1><span role="img" aria-label="Close">📈</span> Charts</h1>
                <div className="filterChart">
                    <div className="filterByCountry">
                        <span htmlFor="filterCountry">Country: </span>
                        <select onChange={(e) => onChangeFilterCountry(e)} value={country} className="filterCountry" id="filterCountry" >
                            {
                                countries.map(country => (
                                    <option key={country}>{country}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="filterByDate">
                        <span htmlFor="filterDay">  Date: </span>
                        <select onChange={(e) => onChangeFilterDays(e)} value={daysShown} id="filterDay">
                            <option value="-1">All the time</option>
                            <option value={timeline.length - 90}>Last 3 Months</option>
                            <option value={timeline.length - 30}>Last 30 Days</option>
                        </select>
                    </div>
                </div>
                
            </div>
            <div className="cases">
                <h1>Total Cases in {country}</h1>
                <Line
                    data = {
                        {
                            labels: filteredByDate.map(day => day.date),
                            datasets: [{
                                label: `Total cases in ${country}`,
                                data: filteredByDate.map(day => day.confirmed),
                                backgroundColor: 'rgba(134,179,238, .4)',
                                borderColor: 'rgba(24,119,242,1)',
                                borderWidth: 1
                            }]
                        }
                    }
                    width = {200}
                    height = {200}
                    options={{ maintainAspectRatio: false}}
                />
            </div>
            <div className="deaths">
            <h1>Total Deaths in {country}</h1>
                <Line
                    data = {
                        {
                            labels: filteredByDate.map(day => day.date),
                            datasets: [{
                                label: `Total Deaths in ${country}`,
                                data: filteredByDate.map(day => day.deaths),
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 9, 132, 1)',
                                borderWidth: 1
                            }]
                        }
                    }
                    width = {200}
                    height = {200}
                    options={{ maintainAspectRatio: false}}
                /> 
            </div>
        </section>
    )
}

export default Charts;