import streamlit as st
import pandas as pd
import random

# Set page config FIRST
st.set_page_config(page_title="AI/ML Explorer", layout="wide")

# Load data
@st.cache_data
def load_data():
    return pd.read_csv("/Users/anirudhyadav/Documents/GitHub/GenAI/Anirudh_Learning_path/Complete_ML_AI.csv")

df = load_data()

# Header Hero Section with Gradient
st.markdown("""
    <div style='background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); padding: 2rem; border-radius: 15px; color: white;'>
        <h1 style='text-align: center;'>🧠 AI/ML/GenAI/RL Explorer</h1>
        <p style='text-align: center; font-size: 1.2rem;'>Search, Filter, and Learn AI Models Intuitively – for Students & Practitioners 🚀</p>
    </div>
""", unsafe_allow_html=True)

# Section below hero with cards
st.markdown("""
<div style='display: flex; justify-content: space-around; margin-top: 2rem;'>
    <div style='text-align: center; width: 30%;'>
        <h2>📚 AI-ready models</h2>
        <p style='font-size: 0.9rem;'>Browse standardized ML models with clear tags, complexity, and real-world use cases.</p>
    </div>
    <div style='text-align: center; width: 30%;'>
        <h2>🧰 Explainability Toolkit</h2>
        <p style='font-size: 0.9rem;'>Discover model interpretation techniques like SHAP, LIME, PDP with evaluation insights.</p>
    </div>
    <div style='text-align: center; width: 30%;'>
        <h2>🚀 Deployment Ready</h2>
        <p style='font-size: 0.9rem;'>Learn which models are fast, interpretable, and best for production deployment paths.</p>
    </div>
</div>
""", unsafe_allow_html=True)

# Search Bar + Dropdown combo below card section
search_col1, search_col2 = st.columns([6, 2])
with search_col1:
    keyword = st.text_input("🔍 Generic Keyword Search", placeholder="e.g. regression, accuracy, GPT, SHAP")
with search_col2:
    search_scope = st.selectbox("🔎 Search In", ["All Columns", "Algorithm", "Type", "Metrics", "Use Case"])

# Sidebar Filters
with st.sidebar:
    st.title("🧭 Filters")
    st.markdown("---")
    category = st.multiselect("📘 Category / Type", sorted(df["Type"].unique()))
    complexity = st.multiselect("🍀 Complexity", sorted(df["Complexity (Low/Med/High)"].unique()))
    st.markdown("---")
    st.caption("Crafted with ❤️ for students and AI enthusiasts")

# Filter logic
filtered_df = df.copy()
if category:
    filtered_df = filtered_df[filtered_df["Type"].isin(category)]
if complexity:
    filtered_df = filtered_df[filtered_df["Complexity (Low/Med/High)"].isin(complexity)]
if keyword:
    keyword = keyword.lower()
    if search_scope == "All Columns":
        filtered_df = filtered_df[filtered_df.apply(lambda row: row.astype(str).str.lower().str.contains(keyword).any(), axis=1)]
    else:
        col_map = {
            "Algorithm": "Algorithm",
            "Type": "Type",
            "Metrics": "Evaluation Metric(s)",
            "Use Case": "Best Use Case"
        }
        selected_col = col_map[search_scope]
        filtered_df = filtered_df[filtered_df[selected_col].str.lower().str.contains(keyword)]

# Display result count
st.markdown(f"### 🎯 {len(filtered_df)} Models Found")

# Display as icon tiles (4 columns now)
cols = st.columns(4)
for index, (_, row) in enumerate(filtered_df.iterrows()):
    with cols[index % 4]:
        if st.button(f"🧠 {row['Algorithm']}", key=row['Algorithm']):
            st.markdown(f"## 🔍 {row['Algorithm']} - Details")
            st.markdown(f"""
            🔹 **Best Use Case**: _{row['Best Use Case']}_  
            📘 **Type**: {row['Type']}  
            🧩 **Complexity**: `{row['Complexity (Low/Med/High)']}`  
            📌 **Key Concepts**: `{row['Key Fundamentals to Know']}`  
            🧰 **Libraries**: `{row['Libraries']}`  
            📊 **Real-World Example**: _{row['Real-World Example']}_  
            ⚙️ **Hyperparameters**: `{row['Hyperparameters to Tune']}`  
            🚀 **Speed**: {row['Speed (Training/Prediction)']} | **Deployment**: {row['Deployment Strategy']}  
            📈 **Metrics**: `{row['Evaluation Metric(s)']}`  
            🎯 **Higher/Lower Guidance**: _{row['Higher or Lower']}_  
            🧠 **What it Evaluates**: {row['What It Evaluates']}  
            🖋️ **Formatted**: _{row['Evaluation Metrics']}_
            """, unsafe_allow_html=True)

# GitHub Footer Section
st.markdown("---")
st.markdown("""
<div style='text-align:center;'>
    <h3>🌐 Learn More & Contribute</h3>
    <p>Explore the full learning platform, projects, and notebooks on <a href='https://github.com/your-username/your-repo-name' target='_blank'>GitHub</a> ✨</p>
    <small>Crafted with ❤️ for students and lifelong learners.</small>
</div>
""", unsafe_allow_html=True)
