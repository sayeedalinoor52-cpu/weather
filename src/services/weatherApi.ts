import { WeatherData, CurrentWeather, DailyForecast } from '../types';
import {
  getWindCompassDirection,
  getWeatherConditionInfo,
  formatTimeIST,
  formatDateTimeIST,
  computeWeatherAlerts,
} from '../utils/weatherUtils';

const CHALTIA_COORDS = {
  latitude: 24.0692,
  longitude: 88.2628,
};

const CHALTIA_NAME = 'Chaltia, Berhampore';
const CHALTIA_REGION = 'Murshidabad, West Bengal, India';

export async function fetchChaltiaWeather(): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${CHALTIA_COORDS.latitude}&longitude=${CHALTIA_COORDS.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,is_day&hourly=precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=Asia%2FKolkata&wind_speed_unit=kmh`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    // Cache: 'no-store' ensures the "Refresh" button always pulls fresh, real-time data
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Weather service responded with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.current || !data.daily) {
    throw new Error('Incomplete weather data received from meteorological service.');
  }

  const cur = data.current;
  const daily = data.daily;
  const isDay = cur.is_day === 1;

  // Derive condition text
  const condition = getWeatherConditionInfo(cur.weather_code, isDay);

  // Today's high and low
  const todayMax = daily.temperature_2m_max?.[0] ?? cur.temperature_2m;
  const todayMin = daily.temperature_2m_min?.[0] ?? cur.temperature_2m;
  const todaySunrise = daily.sunrise?.[0] ? formatTimeIST(daily.sunrise[0]) : '--';
  const todaySunset = daily.sunset?.[0] ? formatTimeIST(daily.sunset[0]) : '--';
  const todayRainProb = daily.precipitation_probability_max?.[0] ?? 0;
  const todayUv = daily.uv_index_max?.[0];

  const currentWeather: CurrentWeather = {
    time: cur.time,
    temperature: Math.round(cur.temperature_2m * 10) / 10,
    apparentTemperature: Math.round(cur.apparent_temperature * 10) / 10,
    weatherCode: cur.weather_code,
    conditionText: condition.text,
    isDay,
    humidity: Math.round(cur.relative_humidity_2m),
    windSpeed: Math.round(cur.wind_speed_10m * 10) / 10,
    windDirection: Math.round(cur.wind_direction_10m),
    windDirectionCompass: getWindCompassDirection(cur.wind_direction_10m),
    precipitation: Math.round(cur.precipitation * 10) / 10,
    rain: Math.round(cur.rain * 10) / 10,
    precipitationProbability: todayRainProb,
    todayMaxTemp: Math.round(todayMax * 10) / 10,
    todayMinTemp: Math.round(todayMin * 10) / 10,
    sunrise: todaySunrise,
    sunset: todaySunset,
    uvIndex: todayUv ? Math.round(todayUv * 10) / 10 : undefined,
  };

  // 7-day daily forecast
  const dailyForecastList: DailyForecast[] = [];
  const count = Math.min(daily.time.length, 7);

  for (let i = 0; i < count; i++) {
    const rawDateStr = daily.time[i]; // "YYYY-MM-DD"
    const dateObj = new Date(`${rawDateStr}T00:00:00+05:30`);
    
    let dayName = '';
    if (i === 0) {
      dayName = 'Today';
    } else if (i === 1) {
      dayName = 'Tomorrow';
    } else {
      dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObj);
    }

    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
    }).format(dateObj);

    const wCode = daily.weather_code[i];
    const wInfo = getWeatherConditionInfo(wCode, true);

    dailyForecastList.push({
      date: rawDateStr,
      dayName,
      formattedDate,
      weatherCode: wCode,
      conditionText: wInfo.text,
      maxTemp: Math.round(daily.temperature_2m_max[i] * 10) / 10,
      minTemp: Math.round(daily.temperature_2m_min[i] * 10) / 10,
      precipitationProbability: daily.precipitation_probability_max[i] ?? 0,
      precipitationSum: Math.round((daily.precipitation_sum[i] ?? 0) * 10) / 10,
      sunrise: daily.sunrise?.[i] ? formatTimeIST(daily.sunrise[i]) : '--',
      sunset: daily.sunset?.[i] ? formatTimeIST(daily.sunset[i]) : '--',
    });
  }

  // Active weather alerts
  const alerts = computeWeatherAlerts(
    {
      weatherCode: cur.weather_code,
      apparentTemperature: cur.apparent_temperature,
      temperature: cur.temperature_2m,
      windSpeed: cur.wind_speed_10m,
      humidity: cur.relative_humidity_2m,
      rain: cur.rain,
    },
    {
      weatherCode: daily.weather_code[0],
      precipitationSum: daily.precipitation_sum?.[0] ?? 0,
      precipitationProbabilityMax: todayRainProb,
      uvIndexMax: todayUv,
      maxTemp: todayMax,
    }
  );

  const now = new Date();

  return {
    locationName: CHALTIA_NAME,
    locationDetails: CHALTIA_REGION,
    coordinates: CHALTIA_COORDS,
    lastUpdated: now.toISOString(),
    formattedLastUpdated: formatDateTimeIST(now),
    current: currentWeather,
    dailyForecast: dailyForecastList,
    alerts,
  };
}
