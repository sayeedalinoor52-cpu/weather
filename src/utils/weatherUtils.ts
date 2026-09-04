import { WeatherAlert } from '../types';

export function getWindCompassDirection(degrees: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.round(((degrees % 360) / 22.5)) % 16;
  return directions[index];
}

export function getWeatherConditionInfo(code: number, isDay: boolean = true): {
  text: string;
  iconName: 'Sun' | 'Moon' | 'CloudSun' | 'CloudMoon' | 'Cloud' | 'CloudRain' | 'CloudDrizzle' | 'CloudLightning' | 'CloudFog' | 'Snowflake';
  color: string;
  bgGradient: string;
} {
  switch (code) {
    case 0:
      return isDay
        ? { text: 'Clear Sky', iconName: 'Sun', color: 'text-amber-500', bgGradient: 'from-amber-500/10 to-orange-500/5' }
        : { text: 'Clear Sky', iconName: 'Moon', color: 'text-indigo-400', bgGradient: 'from-indigo-500/10 to-purple-500/5' };
    case 1:
      return isDay
        ? { text: 'Mainly Clear', iconName: 'CloudSun', color: 'text-amber-500', bgGradient: 'from-amber-500/10 to-sky-500/5' }
        : { text: 'Mainly Clear', iconName: 'CloudMoon', color: 'text-indigo-400', bgGradient: 'from-indigo-500/10 to-slate-500/5' };
    case 2:
      return isDay
        ? { text: 'Partly Cloudy', iconName: 'CloudSun', color: 'text-sky-600', bgGradient: 'from-sky-500/10 to-blue-500/5' }
        : { text: 'Partly Cloudy', iconName: 'CloudMoon', color: 'text-indigo-400', bgGradient: 'from-indigo-500/10 to-slate-500/5' };
    case 3:
      return { text: 'Overcast', iconName: 'Cloud', color: 'text-slate-600', bgGradient: 'from-slate-500/10 to-zinc-500/5' };
    case 45:
    case 48:
      return { text: 'Fog / Low Mist', iconName: 'CloudFog', color: 'text-slate-500', bgGradient: 'from-slate-400/10 to-zinc-400/5' };
    case 51:
    case 53:
    case 55:
      return { text: 'Drizzle', iconName: 'CloudDrizzle', color: 'text-teal-600', bgGradient: 'from-teal-500/10 to-cyan-500/5' };
    case 56:
    case 57:
      return { text: 'Freezing Drizzle', iconName: 'CloudDrizzle', color: 'text-cyan-600', bgGradient: 'from-cyan-500/10 to-blue-500/5' };
    case 61:
      return { text: 'Slight Rain', iconName: 'CloudRain', color: 'text-blue-600', bgGradient: 'from-blue-500/10 to-sky-500/5' };
    case 63:
      return { text: 'Moderate Rain', iconName: 'CloudRain', color: 'text-blue-700', bgGradient: 'from-blue-600/10 to-indigo-500/5' };
    case 65:
      return { text: 'Heavy Rain', iconName: 'CloudRain', color: 'text-blue-800', bgGradient: 'from-blue-700/15 to-indigo-600/10' };
    case 66:
    case 67:
      return { text: 'Freezing Rain', iconName: 'CloudRain', color: 'text-cyan-700', bgGradient: 'from-cyan-600/15 to-blue-600/10' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { text: 'Snow', iconName: 'Snowflake', color: 'text-sky-400', bgGradient: 'from-sky-400/10 to-blue-400/5' };
    case 80:
      return { text: 'Light Showers', iconName: 'CloudRain', color: 'text-blue-600', bgGradient: 'from-blue-500/10 to-sky-500/5' };
    case 81:
      return { text: 'Moderate Showers', iconName: 'CloudRain', color: 'text-blue-700', bgGradient: 'from-blue-600/10 to-cyan-500/5' };
    case 82:
      return { text: 'Violent Showers', iconName: 'CloudRain', color: 'text-indigo-700', bgGradient: 'from-indigo-600/15 to-violet-600/10' };
    case 85:
    case 86:
      return { text: 'Snow Showers', iconName: 'Snowflake', color: 'text-sky-500', bgGradient: 'from-sky-500/10 to-indigo-500/5' };
    case 95:
      return { text: 'Thunderstorm', iconName: 'CloudLightning', color: 'text-amber-600', bgGradient: 'from-amber-600/15 to-purple-600/10' };
    case 96:
      return { text: 'Thunderstorm with Hail', iconName: 'CloudLightning', color: 'text-red-600', bgGradient: 'from-red-600/15 to-amber-600/10' };
    case 99:
      return { text: 'Severe Thunderstorm with Heavy Hail', iconName: 'CloudLightning', color: 'text-red-700', bgGradient: 'from-red-700/20 to-purple-700/15' };
    default:
      return { text: 'Fair Weather', iconName: 'CloudSun', color: 'text-slate-600', bgGradient: 'from-slate-500/10 to-gray-500/5' };
  }
}

export function formatTimeIST(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(date);
  } catch {
    // Fallback parser if string is format "YYYY-MM-DDTHH:MM"
    const parts = isoString.split('T');
    if (parts.length > 1) {
      const [h, m] = parts[1].split(':');
      const hourNum = parseInt(h, 10);
      const suffix = hourNum >= 12 ? 'PM' : 'AM';
      const formattedHour = hourNum % 12 || 12;
      return `${formattedHour}:${m} ${suffix}`;
    }
    return isoString;
  }
}

export function formatDateTimeIST(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

export function computeWeatherAlerts(
  current: {
    weatherCode: number;
    apparentTemperature: number;
    temperature: number;
    windSpeed: number;
    humidity: number;
    rain: number;
  },
  todayDaily: {
    weatherCode: number;
    precipitationSum: number;
    precipitationProbabilityMax: number;
    uvIndexMax?: number;
    maxTemp: number;
  }
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  const now = new Date();
  const timeIssued = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(now);

  // Thunderstorm Alert
  if ([95, 96, 99].includes(current.weatherCode) || [95, 96, 99].includes(todayDaily.weatherCode)) {
    const isHail = [96, 99].includes(current.weatherCode) || [96, 99].includes(todayDaily.weatherCode);
    alerts.push({
      id: 'alert-thunderstorm',
      severity: isHail ? 'warning' : 'watch',
      title: isHail ? 'Severe Thunderstorm & Hail Warning' : 'Thunderstorm Alert',
      description: isHail
        ? 'Thunderstorms accompanied by gusty winds, lightning, and hail are active or imminent in the Chaltia/Berhampore area.'
        : 'Lightning and convective thunderstorms forecasted in the Murshidabad district.',
      instruction: 'Stay indoors, disconnect electrical appliances, and avoid sheltering under isolated trees.',
      timeIssued,
    });
  }

  // Heavy Rain Alert
  if (todayDaily.precipitationSum >= 15 || (todayDaily.precipitationProbabilityMax >= 80 && todayDaily.precipitationSum >= 8)) {
    alerts.push({
      id: 'alert-heavy-rain',
      severity: 'warning',
      title: 'Heavy Rainfall Warning',
      description: `Significant precipitation expected today with estimated total rainfall around ${todayDaily.precipitationSum.toFixed(1)} mm and ${todayDaily.precipitationProbabilityMax}% rain probability.`,
      instruction: 'Drive with caution; be alert for localized waterlogging along Berhampore and rural Murshidabad roads.',
      timeIssued,
    });
  } else if (todayDaily.precipitationProbabilityMax >= 65 && todayDaily.precipitationSum >= 5) {
    alerts.push({
      id: 'alert-moderate-rain',
      severity: 'advisory',
      title: 'Rain Shower Advisory',
      description: `Intermittent rain showers likely today with a ${todayDaily.precipitationProbabilityMax}% probability of precipitation.`,
      instruction: 'Carry an umbrella when traveling outdoors.',
      timeIssued,
    });
  }

  // Extreme Heat / High Apparent Temperature Alert
  if (current.apparentTemperature >= 40 || todayDaily.maxTemp >= 38) {
    alerts.push({
      id: 'alert-heat',
      severity: 'warning',
      title: 'High Heat Index Warning',
      description: `Very high heat index felt at ${current.apparentTemperature.toFixed(1)}°C with high humidity levels.`,
      instruction: 'Drink plenty of water and minimize strenuous outdoor exposure during peak afternoon hours.',
      timeIssued,
    });
  }

  // Strong Wind Alert
  if (current.windSpeed >= 35) {
    alerts.push({
      id: 'alert-wind',
      severity: 'advisory',
      title: 'Gusty Wind Advisory',
      description: `Sustained winds and gusts reaching ${current.windSpeed.toFixed(1)} km/h.`,
      instruction: 'Secure loose outdoor items.',
      timeIssued,
    });
  }

  // High UV Alert
  if (todayDaily.uvIndexMax && todayDaily.uvIndexMax >= 8) {
    alerts.push({
      id: 'alert-uv',
      severity: 'advisory',
      title: 'Very High UV Radiation Alert',
      description: `UV Index reaching ${todayDaily.uvIndexMax.toFixed(1)}. Skin protection required during midday.`,
      instruction: 'Seek shade during midday hours, wear UV-blocking sunglasses and sunscreen.',
      timeIssued,
    });
  }

  return alerts;
}
