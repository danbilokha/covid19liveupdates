import {ApiCountriesCovid19Situation} from "../../models/covid19";
import axios, {AxiosResponse} from 'axios';

export function fetchCovid19Data(): Promise<ApiCountriesCovid19Situation> {
    return axios.get("https://pomber.github.io/covid19/timeseries.json")
        .then((response: AxiosResponse): ApiCountriesCovid19Situation => response.data)

}