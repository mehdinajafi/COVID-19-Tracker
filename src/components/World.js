import React, { useEffect, useState } from 'react';
import '../styles/World.css'
import cases from '../assets/img/cases.svg';
import deaths from '../assets/img/deaths.svg';
import recoveries from '../assets/img/recoveries.svg';
import active_cases from '../assets/img/active_cases.svg';
import axios from 'axios';

const World = () => {
    // worldStatus get data from https://disease.sh/v3/covid-19/all 
    // and set in useEffect
    const [worldStatus, setWorldStatus] = useState({})
    useEffect(() => {
        axios.get("https://disease.sh/v3/covid-19/all")
            .then((res) => {
                setWorldStatus(res.data)
            })
    }, [])

    // This function separates the numbers from left with ,
    const formatNumber = (num) => {
        if(!isNaN(num)) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
            return null
        } 
    }

    // Date variable is date that data has updated
    const date = new Date(!isNaN(worldStatus) ? worldStatus.updated : null)

    return (
        <section className="world-tracker">
            {/* Start header section */}
            <div className="header">
                <div>
                    <h1><span role="img" aria-label="Close">🦠</span> COVID-19 Tracker</h1>
                    <p>Track the spread of the Coronavirus Covid-19 outbreak</p>
                </div>
            </div>
            {/* End header section */}


            {/* Start card section */}
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-info">
                        <h5 className="card-title">TOTAL CASES</h5>
                        <h2>{formatNumber(worldStatus.cases)}</h2>
                    </div>
                    <img src={cases} alt="cases"/>
                </div>
                <div className="card">
                    <div className="card-info">
                        <h5 className="card-title">TOTAL DEATHS</h5>
                        <h2>{formatNumber(worldStatus.deaths)}</h2>
                    </div>
                    <img src={deaths} alt="deaths"/>
                </div>
                <div className="card">
                    <div className="card-info">
                        <h5 className="card-title">TOTAL RECOVERIES</h5>
                        <h2>{formatNumber(worldStatus.recovered)}</h2>
                    </div>
                    <img src={recoveries} alt="recoveries"/>
                </div>
                <div className="card">
                    <div className="card-info">
                        <h5 className="card-title">ACTIVE CASES</h5>
                        <h2>{formatNumber(worldStatus.active)}</h2>
                    </div>
                    <img src={active_cases} alt="active-cases"/>
                </div>
            </div>
            {/* End card section */}
        </section>
    )
}

export default World;