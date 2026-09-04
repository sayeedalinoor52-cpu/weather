import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WeatherAlert } from '../types';

interface WeatherAlertCardProps {
  alerts: WeatherAlert[];
}

export const WeatherAlertCard: React.FC<WeatherAlertCardProps> = ({ alerts }) => {
  const [expanded, setExpanded] = useState(false);

  if (alerts.length === 0) {
    return (
      <section
        id="weather-alerts-clear"
        className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center space-x-3 shadow-xs"
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
        <p className="text-slate-700 text-sm font-semibold">
          <span className="uppercase mr-2 text-slate-400 text-xs font-bold tracking-wider">Status:</span>
          No severe weather alerts active in Chaltia & Berhampore.
        </p>
      </section>
    );
  }

  const primaryAlert = alerts[0];
  const hasMultiple = alerts.length > 1;

  return (
    <section
      id="weather-alerts-container"
      className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex flex-col transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <div className="w-2 h-2 bg-rose-500 rounded-full shrink-0 animate-pulse" />
          <p className="text-rose-800 text-sm font-semibold leading-snug">
            <span className="uppercase mr-2 opacity-60 text-xs tracking-wider">Weather Alert:</span>
            <span>{primaryAlert.title} — {primaryAlert.description}</span>
          </p>
        </div>

        {hasMultiple && (
          <button
            id="toggle-alerts-btn"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold uppercase tracking-wider text-rose-700 hover:text-rose-900 shrink-0 flex items-center gap-1 cursor-pointer"
          >
            {expanded ? (
              <>
                Less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                +{alerts.length - 1} More <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>

      {primaryAlert.instruction && (
        <p className="text-xs text-rose-700/90 font-medium mt-2 pl-5 sm:pl-6">
          <strong className="uppercase tracking-wider opacity-70">Guidance:</strong> {primaryAlert.instruction}
        </p>
      )}

      {expanded && hasMultiple && (
        <div className="mt-3 pt-3 border-t border-rose-200/80 space-y-2 pl-5 sm:pl-6">
          {alerts.slice(1).map((alert) => (
            <div key={alert.id} className="text-xs text-rose-800">
              <span className="font-bold">{alert.title}:</span> {alert.description}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
