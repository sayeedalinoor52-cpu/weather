import React from 'react';
import { DailyForecast } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface ForecastSectionProps {
  forecast: DailyForecast[];
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast }) => {
  return (
    <section id="extended-forecast" className="mt-auto pt-6 border-t border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-extrabold">
          Extended 7-Day Forecast
        </p>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:inline">
          Murshidabad Region
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.map((day, idx) => {
          const isToday = idx === 0;
          return (
            <div
              key={day.date}
              className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all ${
                isToday
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Day Label */}
              <p
                className={`text-xs font-bold mb-2 uppercase tracking-wider ${
                  isToday ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                {isToday ? 'Today' : `${day.dayName.toUpperCase()} ${day.formattedDate.split(' ')[0]}`}
              </p>

              {/* Weather Icon */}
              <div className="my-2 h-8 flex items-center justify-center">
                <WeatherIcon
                  code={day.weatherCode}
                  isDay={true}
                  size={26}
                  className={isToday ? 'text-white' : undefined}
                />
              </div>

              {/* Condition Summary */}
              <p
                className={`text-[11px] font-medium line-clamp-1 mb-2 ${
                  isToday ? 'text-slate-300' : 'text-slate-600'
                }`}
                title={day.conditionText}
              >
                {day.conditionText}
              </p>

              {/* High & Low Temp */}
              <div
                className={`flex gap-2 text-sm font-bold mt-auto ${
                  isToday ? 'text-white' : 'text-slate-800'
                }`}
              >
                <span>{Math.round(day.maxTemp)}°</span>
                <span className={isToday ? 'text-slate-500' : 'text-slate-300'}>
                  {Math.round(day.minTemp)}°
                </span>
              </div>

              {/* Chance of Rain */}
              <p
                className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${
                  isToday ? 'text-sky-400' : 'text-sky-600'
                }`}
              >
                {day.precipitationProbability}% Rain
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
