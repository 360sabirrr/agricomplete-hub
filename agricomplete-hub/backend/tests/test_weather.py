import unittest

from routes.weather import _weather_window_summary


class WeatherImpactTests(unittest.TestCase):
    def test_summarizes_7_15_and_30_day_windows(self):
        daily = {
            'time': [f'2026-05-{day:02d}' for day in range(1, 31)],
            'precipitation_sum': list(range(1, 31)),
            'temperature_2m_max': [30 + day / 10 for day in range(30)],
            'temperature_2m_min': [15 + day / 10 for day in range(30)],
            'relative_humidity_2m_mean': [60 + day for day in range(30)],
        }

        seven = _weather_window_summary(daily, 7)
        fifteen = _weather_window_summary(daily, 15)
        thirty = _weather_window_summary(daily, 30)

        self.assertEqual(seven['rainfall_mm'], sum(range(24, 31)))
        self.assertEqual(seven['records_used'], 7)
        self.assertEqual(fifteen['records_used'], 15)
        self.assertEqual(thirty['records_used'], 30)
        self.assertEqual(thirty['max_temperature_c'], 32.9)
        self.assertEqual(thirty['min_temperature_c'], 15.0)
        self.assertEqual(thirty['average_humidity_percent'], 74.5)


if __name__ == '__main__':
    unittest.main()
