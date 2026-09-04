import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Snowflake,
} from 'lucide-react';
import { getWeatherConditionInfo } from '../utils/weatherUtils';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  className = '',
  size = 28,
}) => {
  const info = getWeatherConditionInfo(code, isDay);

  const iconProps = {
    size,
    className: className || info.color,
    'aria-hidden': true,
  };

  switch (info.iconName) {
    case 'Sun':
      return <Sun {...iconProps} />;
    case 'Moon':
      return <Moon {...iconProps} />;
    case 'CloudSun':
      return <CloudSun {...iconProps} />;
    case 'CloudMoon':
      return <CloudMoon {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} />;
    case 'CloudFog':
      return <CloudFog {...iconProps} />;
    case 'Snowflake':
      return <Snowflake {...iconProps} />;
    default:
      return <CloudSun {...iconProps} />;
  }
};
