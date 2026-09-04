import React from 'react';
import { CurrentWeather } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  current: CurrentWeather;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ current }) => {
  return (
    <div id="current-weather-hero" className="flex-1 flex flex-col justify-center py-2 sm:py-4">
      {/* Temperature Display */}
      <div className="flex items-start">
        <span className="text-[96px] xs:text-[120px] sm:text-[140px] lg:text-[160px] font-thin leading-[0.8] tracking-tighter text-slate-800 select-none">
          {Math.round(current.temperature)}°
        </span>
        <span className="text-3xl sm:text-5xl font-light text-slate-300 mt-2 sm:mt-4 ml-1 sm:ml-2">
          C
        </span>
      </div>

      {/* Condition & High/Low Pills */}
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center gap-3">
          <WeatherIcon code={current.weatherCode} isDay={current.isDay} size={32} />
          <h2 className="text-2xl sm:text-4xl font-medium text-slate-700 tracking-tight">
            {current.conditionText}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-semibold shadow-xs text-slate-800 flex items-center">
            <span className="text-slate-400 mr-2 font-bold text-xs">H</span>
            {current.todayMaxTemp}°
          </span>
          <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-semibold shadow-xs text-slate-800 flex items-center">
            <span className="text-slate-400 mr-2 font-bold text-xs">L</span>
            {current.todayMinTemp}°
          </span>
          <span className="px-3.5 py-1.5 bg-slate-100 border border-slate-200/80 rounded-full text-xs font-semibold text-slate-600 flex items-center">
            <span className="text-slate-400 mr-1.5">Exact:</span>
            {current.temperature}°C
          </span>
        </div>
      </div>
    </div>
  );
};
