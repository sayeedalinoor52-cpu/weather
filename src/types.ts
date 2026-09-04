export interface CurrentWeather {
  time: string;
  temperature: number; // in °C
  apparentTemperature: number; // feels like in °C
  weatherCode: number;
  conditionText: string;
  isDay: boolean;
  humidity: number; // in %
  windSpeed: number; // in km/h
  windDirection: number; // in degrees
  windDirectionCompass: string;
  precipitation: number; // mm
  rain: number; // mm
  precipitationProbability: number; // %
  todayMaxTemp: number;
  todayMinTemp: number;
  sunrise: string;
  sunset: string;
  uvIndex?: number;
}

export interface DailyForecast {
  date: string; // ISO string e.g. "2026-09-05"
  dayName: string; // e.g. "Today", "Sat", "Sun"
  formattedDate: string; // e.g. "05 Sep"
  weatherCode: number;
  conditionText: string;
  maxTemp: number; // °C
  minTemp: number; // °C
  precipitationProbability: number; // %
  precipitationSum: number; // mm
  sunrise: string;
  sunset: string;
}

export interface WeatherAlert {
  id: string;
  severity: 'warning' | 'watch' | 'advisory' | 'info';
  title: string;
  description: string;
  instruction?: string;
  timeIssued: string;
}

export interface WeatherData {
  locationName: string;
  locationDetails: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  lastUpdated: string;
  formattedLastUpdated: string;
  current: CurrentWeather;
  dailyForecast: DailyForecast[];
  alerts: WeatherAlert[];
}
