import { City, Country, State } from "country-state-city"
import { isEmpty } from "lodash"
import { json } from "react-router-dom"

export const AllCountries = () => {
    return (Array.from(Country.getAllCountries().map((e) => {
        return { countryName: e.name, countryCode: e.isoCode }
    })))
}

export const CountryStates = (countryCode) => {
    if (!isEmpty(countryCode)) {
        return (Array.from(State.getStatesOfCountry(JSON.parse(countryCode).countryCode).map((e) => {
            return { stateName: e.name, stateCode: e.isoCode }
        })))
    }
    else{
        return [{ stateName: 'Select Country First', stateCode: '' }]
    }
}

export const StateCities = (countryCode, stateCode) => {
    if (!isEmpty(stateCode)) {
        return (Array.from(City.getCitiesOfState(JSON.parse(countryCode).countryCode,JSON.parse(stateCode).stateCode).map((e) => {
            return { cityName: e.name, cityCode: e.isoCode }
        })))
    }
    else{
        return [{ cityName: 'Select City First', cityCode: '' }]
    }
}

