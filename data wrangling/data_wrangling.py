import pandas as pd
import numpy as np
import seaborn as sns
from matplotlib import pyplot as plt
import glob

sns.set_theme(style="whitegrid")
plt.figure(figsize=(25, 20))


def print_full(x):
    pd.set_option('display.max_rows', len(x))
    print(x)
    pd.reset_option('display.max_rows')


def read_all_files():
    path = r'Data Visualization/'  # use your path
    all_files = glob.glob(path + "/*.csv")

    df_list = []

    for filename in all_files:
        df = pd.read_csv(filename, index_col=None, header=0)
        df_mod = df.drop(
            ['90th Percentile AQI', 'Days CO', 'Days NO2', 'Days Ozone', 'Days SO2', 'Days PM2.5', 'Days PM10'],
            axis=1)
        df_state = df_mod.groupby('State').mean().sort_values(by=['State']).reset_index()
        df_list.append(df_state)

    aqi = pd.concat(df_list, axis=0, ignore_index=True)

    aqi_by_year = aqi#.groupby('Year', as_index=False).reset_index()  #.sort_values(by=['State'])
    print(aqi_by_year.head())

    return aqi_by_year


def read_single_file(path, sort_value):
    df = pd.read_csv(path)
    df_mod = df.drop(
        ['Year', '90th Percentile AQI', 'Days CO', 'Days NO2', 'Days Ozone', 'Days SO2', 'Days PM2.5', 'Days PM10'],
        axis=1)
    aqi = df_mod.groupby('State').mean().sort_values(by=[sort_value], ascending=False).reset_index()

    print(aqi.head())

    return aqi

median_aqi_2021 = read_single_file('Data Visualization/annual_aqi_by_county_2021.csv', 'Median AQI')
max_aqi_2021 = read_single_file('Data Visualization/annual_aqi_by_county_2021.csv', 'Max AQI')
aqi = read_all_files()
sns.barplot(x='Median AQI', y='State', data=median_aqi_2021, orient='h', palette='rocket')
plt.savefig("Median_AQI_Plot.png")
sns.barplot(x='Max AQI', y='State', data=max_aqi_2021, orient='h', palette='rocket')
plt.savefig("Max_AQI_Plot.png")
median_aqi_2021.to_csv("median_aqi_2021.csv", index=False)
max_aqi_2021.to_csv("max_aqi_2021.csv", index=False)
aqi.to_csv("aqi_by_state.csv", index=False)
