import {Image, Text, View} from "react-native";
import {weatherImages} from "../data/Constants";
import {ApiForecastResult, ApiForecastResultCurrent, ApiForecastResultLocation} from "../api/ApiResults";


type SingleDayWeatherViewProps = {
    location: ApiForecastResultLocation | null;
    current: ApiForecastResultCurrent | null;
    weather: ApiForecastResult | null;
}

/**
 * View for showing weather info for today.
 */
export function SingleDayWeatherView({location, current, weather}: SingleDayWeatherViewProps) {

    return (<View
        style={{
            flex: 1,
            paddingVertical: 15,
            justifyContent: 'space-around',
            alignItems: 'stretch',
            zIndex: -1,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }}
    >

        {/*location (city and country)*/}
        <Text
            style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 25,
                fontWeight: 'bold'
            }}
        >
            {location?.name},{'\u0020'}
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'rgb(209 213 219)'
                }}
            >
                {location?.country}
            </Text>
        </Text>

        {/*Weather image*/}
        <Image
            // @ts-ignore
            source={weatherImages[current.condition.text]}
            style={{
                alignSelf: 'center',
                width: 210,
                height: 210,
                marginTop: 5,
            }}
        />

        <View
            style={{
                alignItems: 'center'
            }}>
            {/*Temperature in celsius.*/}
            <Text
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 40,
                }}
            >{current?.temp_c}&#176;</Text>
            {/*Today's weather condition.*/}
            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                    marginTop: 7,
                }}
            >{current?.condition?.text}</Text>
        </View>

        {/*A row of other stats*/}
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 18,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={require('../../assets/icons/wind.png')}
                    style={{
                        height: 25,
                        width: 25
                    }}

                />
                <Text
                    style={{
                        fontSize: 16,
                        marginLeft: 8,
                        color: 'white',
                        fontWeight: '600'
                    }}
                >{current?.wind_kph} km/h</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={require('../../assets/icons/drop.png')}
                    style={{
                        height: 25,
                        width: 25
                    }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        marginLeft: 8,
                        color: 'white',
                        fontWeight: '600'
                    }}
                >{current?.humidity}%</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={require('../../assets/icons/sun.png')}
                    style={{
                        height: 25,
                        width: 25
                    }}
                />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 8,
                    color: 'white',
                    fontWeight: '600'
                }}>{weather?.forecast.forecastday[0].astro.sunrise}</Text>
            </View>
        </View>
    </View>);
}