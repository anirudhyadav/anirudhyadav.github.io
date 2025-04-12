import pandas as pd
df = pd.read_csv("/Users/anirudhyadav/Documents/GitHub/anirudhyadav.github.io/Complete_ML_AI.csv")
df.to_json("/Users/anirudhyadav/Documents/GitHub/anirudhyadav.github.io/Complete_ML_AI.json", orient="records")