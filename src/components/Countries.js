import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Countries.css';

const Countries = () => {
    // Countries state: set countries status in array as object Included cases, deaths and...
    const [countries, setCountries] = useState([])
    // Filtred state: when user search a country this state keep filtred countries by name.
    const [filtred, setFiltred] = useState([])
    // Search sate: keep keep and change value of input
    const [search, setSearch] = useState("");
    // Records state: how many countries should be displayed on this page?
    const [records, setRecords] = useState(9)

    // In useEffect get countries status of this api: https://disease.sh/v3/covid-19/countries
    useEffect(() => {
        axios.get("https://disease.sh/v3/covid-19/countries")
            .then(res => {
                // Sort countries by cases
                const data =  res.data.sort((a,b) => {
                    if(a.cases > b.cases) {
                        return -1
                    } else if (a.cases < b.cases) {
                        return 1
                    } else {
                        return 0
                    }
                })
                setCountries(data)
                setFiltred(data)
            })
    }, [])

    // Show more and show less btns increase and decrease the countries 
    // that need to be shown in page by records state
    const showMore = () => {
        if(records < 215) {
            setRecords(records => records + 10)
        }
    }

    const showLess = () => {
        if(records > 9) {
            setRecords(records => records - 10)
        }
    }

    // onInputSearch filter countries by name of country that user type in input
    const onInputSearch = (e) => {
        setSearch(e.target.value)
        if(search.length > 0) {
            setFiltred(countries.filter(name => name.country.toLowerCase().includes(search.toLowerCase())))
        } 
    }

    return (
        <section className="country-breakdown">

            <div className="country-breakdown-header">
                <h1 className="country-breakdown-title"><span role="img" aria-label="Close">🌎</span> Country Breakdown</h1>
                <input 
                onInput={(e) => onInputSearch(e)} 
                className="search-input"
                placeholder="Search country..."/>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        <th>Critical</th>
                        <th>Recovered</th>
                        <th>Today's Cases</th>
                        <th>Today's Deaths</th>
                        <th>Cases Per 1M</th>
                        <th>Deaths Per 1M</th>
                    </tr>
                </thead>
                <tbody>
                {

                    (search.length === 0 ? countries : filtred).map((country, index) => {
                        if(index <= records) {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="country">
                                        <img src={country.countryInfo.flag} className="country-flag" alt="country-flag"/>
                                        <span className="country-name">{country.country}</span>
                                    </td>
                                    <td>{country.cases === 0 ? null : country.cases}</td>
                                    <td>{country.deaths === 0 ? null : country.deaths}</td>
                                    <td>{country.critical === 0 ? null : country.critical}</td>
                                    <td className="recovered">{country.recovered === 0 ? null : country.recovered}</td>
                                    <td className="todayCases">{country.todayCases === 0 ? null : `+${country.todayCases}`}</td>
                                    <td className="todayDeaths">{country.todayDeaths === 0 ? null : `+${country.todayDeaths}`}</td>
                                    <td>{country.casesPerOneMillion}</td>
                                    <td>{country.deathsPerOneMillion}</td>
                                </tr>
                            )
                        }
                        return null
                    })
                }
                </tbody>
            </table>

            {/* Btns section showed when input is empty */}
            <div className="show-less-btns">
                {search.length===0 ? 
                [
                <button onClick={showMore} className="show-more-btn" key="showMore-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="18" y1="13" x2="12" y2="19" />
                        <line x1="6" y1="13" x2="12" y2="19" />
                    </svg>
                    <span>Show more</span>
                </button>
                ,
                <button onClick={showLess} className="show-less-btn"  key="showLess-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-up" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="18" y1="11" x2="12" y2="5" />
                        <line x1="6" y1="11" x2="12" y2="5" />
                    </svg>
                    <span>Show less</span>
                </button> 
                ]
                : null}
            </div>
        </section>
    )
}

export default Countries;