import axios from "axios";
import {apiKey} from "../data/Constants";

type forecastEndpointParams = {
    cityName: string;
    days: string;
}

const forecastEndpoint = (params: forecastEndpointParams) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

type searchEndpointParams = {
    cityName: string;
}

const searchEndpoint = (params: searchEndpointParams) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;


const apiCall = async (endpoint: string) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (e) {
        console.error(`error: ${e}`);
        return null;
    }
}

export const fetchWeatherForecast = (params: forecastEndpointParams) => {
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
}

export const fetchSearchLocations = (params: searchEndpointParams) => {
    let searchUrl = searchEndpoint(params);
    return apiCall(searchUrl);
}