import React from 'react';
import { CurrentWeather } from '../types';

interface WeatherMetricsGridProps {
  current: CurrentWeather;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ current }) => {
  return (
    <div
      id="weather-metrics-grid"
      className="w-full lg:flex-[1.4] grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
    >
      {/* 1. Feels Like */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[120px] transition-all hover:border-slate-200">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">
          Feels Like
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          {current.apparentTemperature}°C
        </p>
      </div>

      {/* 2. Rain Chance */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[120px] transition-all hover:border-slate-200">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">
          Rain Chance
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          {current.precipitationProbability}%
        </p>
      </div>

      {/* 3. Humidity */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[120px] transition-all hover:border-slate-200">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">
          Humidity
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          {current.humidity}%
        </p>
      </div>

      {/* 4. Wind Speed */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[120px] transition-all hover:border-slate-200">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">
          Wind Speed
        </p>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {current.windSpeed}{' '}
            <span className="text-sm font-medium text-slate-400">km/h</span>
          </p>
          <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
            Direction: {current.windDirectionCompass} ({current.windDirection}°)
          </p>
        </div>
      </div>

      {/* 5. Rainfall */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[120px] transition-all hover:border-slate-200">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">
          Rainfall
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          {current.rain > 0 ? current.rain : current.precipitation}{' '}
          <span className="text-sm font-medium text-slate-400">mm</span>
        </p>
      </div>

      {/* 6. Solar Cycle */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[120px] transition-all hover:border-slate-200">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">
          Solar Cycle
        </p>
        <div className="flex justify-between items-end gap-2">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rise</p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{current.sunrise}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Set</p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{current.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
