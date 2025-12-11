import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  relativeHumidity: number;
  visibility: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Orlando coordinates (Winter Park clinic location)
        const latitude = 28.5383;
        const longitude = -81.3792;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,visibility&timezone=auto`,
          { 
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(5000)
          }
        );

        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        const current = data.current;
        
        setWeather({
          temperature: Math.round(current.temperature_2m),
          weatherCode: current.weather_code,
          windSpeed: Math.round(current.wind_speed_10m),
          relativeHumidity: current.relative_humidity_2m,
          visibility: current.visibility / 1000,
        });
        setError(null);
      } catch (err) {
        setError('Unable to load weather');
        console.error('Weather error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="h-12 w-12 text-yellow-500" />;
    if (code === 2 || code === 3) return <Cloud className="h-12 w-12 text-gray-400" />;
    if (code >= 45 && code <= 82) return <CloudRain className="h-12 w-12 text-blue-400" />;
    return <Cloud className="h-12 w-12 text-gray-400" />;
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear Sky";
    if (code === 1) return "Mostly Clear";
    if (code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 49 && code <= 82) return "Rainy";
    return "Weather";
  };

  if (loading) {
    return (
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="text-center text-muted-foreground text-sm">Loading weather...</div>
      </Card>
    );
  }

  if (error || !weather) {
    return null;
  }

  return (
    <Card 
      className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover-elevate transition-all"
      data-testid="weather-widget"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">
            Orlando Weather
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-foreground">
              {weather.temperature}°F
            </span>
            <span className="text-lg text-muted-foreground">
              {getWeatherDescription(weather.weatherCode)}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Wind</div>
                <div className="font-semibold text-foreground">{weather.windSpeed} mph</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Humidity</div>
                <div className="font-semibold text-foreground">{weather.relativeHumidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Visibility</div>
                <div className="font-semibold text-foreground">{weather.visibility.toFixed(1)} km</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex-shrink-0">
          {getWeatherIcon(weather.weatherCode)}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-primary/10">
        <p className="text-xs text-muted-foreground text-center">
          Orlando, FL weather updated every 30 minutes
        </p>
      </div>
    </Card>
  );
}
