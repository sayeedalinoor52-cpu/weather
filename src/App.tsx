/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { WeatherData } from './types';
import { fetchChaltiaWeather } from './services/weatherApi';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { WeatherAlertCard } from './components/WeatherAlertCard';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { ForecastSection } from './components/ForecastSection';

export default function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const weather = await fetchChaltiaWeather();
      setData(weather);
    } catch (err: any) {
      console.error('Failed to fetch Chaltia weather data:', err);
      setError(
        err?.message || 'Unable to retrieve meteorological data. Please check your network connection.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(false);
  }, [loadWeather]);

  // Clean Minimalism timestamp formatting e.g. "Sep 5, 2026 | 03:15 IST"
  const formattedTimestamp = React.useMemo(() => {
    if (!data) return '';
    try {
      const d = new Date(data.lastUpdated);
      const datePart = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      }).format(d);
      const timePart = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }).format(d);
      return `${datePart} | ${timePart} IST`;
    } catch {
      return data.formattedLastUpdated;
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col selection:bg-slate-200">
      <div className="max-w-6xl w-full mx-auto p-4 sm:p-8 flex flex-col flex-1">
        {/* Header - Clean Minimalism */}
        <header
          id="app-header"
          className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-4"
        >
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
              Chaltia Weather
            </h1>
            <p className="text-slate-500 font-medium text-base sm:text-lg">
              Berhampore, Murshidabad • West Bengal, India
            </p>
          </div>

          <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-3 sm:gap-0">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                Latest Update
              </p>
              <p className="text-sm sm:text-lg font-mono text-slate-600">
                {formattedTimestamp || 'Fetching...'}
              </p>
            </div>

            <button
              id="refresh-weather-btn"
              onClick={() => loadWeather(true)}
              disabled={loading || refreshing}
              className="mt-0 sm:mt-3 px-6 py-2.5 bg-slate-900 hover:bg-slate-700 active:scale-95 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              title="Refresh latest real-time data"
              aria-label="Refresh latest real-time data"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
              />
              <span>{refreshing ? 'Updating...' : 'Refresh Data'}</span>
            </button>
          </div>
        </header>

        {/* Error Notification */}
        {error && (
          <div
            id="error-banner"
            className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-800 flex items-center justify-between gap-4 text-sm"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p className="font-semibold text-rose-900">Meteorological Service Notice</p>
                <p className="text-xs text-rose-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => loadWeather(true)}
              className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-700 cursor-pointer shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Skeleton Loading State */}
        {loading && !data && (
          <div id="loading-skeleton" className="py-8 space-y-8 animate-pulse flex-1">
            <div className="h-12 bg-slate-200/60 rounded-2xl" />
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4 w-full">
                <div className="h-28 w-3/4 bg-slate-200/60 rounded-3xl" />
                <div className="h-10 w-1/2 bg-slate-200/60 rounded-xl" />
              </div>
              <div className="w-full lg:flex-[1.4] grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-28 bg-slate-200/60 rounded-3xl" />
                ))}
              </div>
            </div>
            <div className="h-44 bg-slate-200/60 rounded-2xl" />
          </div>
        )}

        {/* Main Dashboard */}
        {data && (
          <div className="flex flex-col flex-1">
            {/* Weather Alert */}
            <div className="mt-6">
              <WeatherAlertCard alerts={data.alerts} />
            </div>

            {/* Main Section: Left Hero Temp + Right 6-card Metrics Grid */}
            <main
              id="main-content"
              className="flex-1 flex flex-col lg:flex-row py-8 gap-8 items-start lg:items-center"
            >
              <CurrentWeatherCard current={data.current} />
              <WeatherMetricsGrid current={data.current} />
            </main>

            {/* Extended 7-Day Forecast */}
            <ForecastSection forecast={data.dailyForecast} />
          </div>
        )}

        {/* Footer Note */}
        <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Chaltia Weather · Real-time live data for Berhampore, Murshidabad</p>
          <p>Powered by Open-Meteo API • Celsius & km/h</p>
        </footer>
      </div>
    </div>
  );
}
