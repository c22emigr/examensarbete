import statsmodels.stats.multicomp as multi
import pandas as pd
import matplotlib.pyplot as plt


def tuckeyTest(*data, groups):
    # Check if there are enough data sources
    if len(data) < 2:
        print("Tukey test requires at least two data sources")
        return

    # Put data into dataframe
    df = pd.DataFrame()
    for i in range(len(data)):
        if i < len(groups):
            df[groups[i]] = data[i]

    # Stack the data (and rename columns)
    stacked_data = df.stack().reset_index()
    stacked_data = stacked_data.rename(columns={'level_0': 'id',
                                                'level_1': 'treatment',
                                                0: 'result'})

    # Show all pairwise comparisons
    res2 = multi.pairwise_tukeyhsd(stacked_data['result'],
                                   stacked_data['treatment'])
    print(res2)

    # Plot simultaneous confidence intervals
    res2.plot_simultaneous()

    # Compute and show the Grand Mean line
    grandMean = stacked_data['result'].values.mean()
    plt.vlines(x=grandMean, ymin=-0.5, ymax=len(groups) - 0.5, color="red")
    plt.show()

DB = ['MongoDB', 'MariaDB']

file1 = "mongodbtuckey.csv"  # File for MongoDB data
file2 = "mariadbtuckey.csv"  # File for MariaDB data

df_mongodb = pd.read_csv(file1, sep=",", header=None, names=['MongoDB'])
df_mariadb = pd.read_csv(file2, sep=",", header=None, names=['MariaDB'])

tuckeyTest(df_mongodb, df_mariadb, groups=DB)