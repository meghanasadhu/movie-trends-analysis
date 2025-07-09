1. Introduction  
__Project Title:
"Analyzing Movie Industry Trends and Box Office Performance using Visualization Techniques"__  
Domain:
This project focuses on movie industry data from the entertainment and media domain through an examination of various film specifications including genres and ratings together with budgeting and revenue and local box office revenues across different regions and languages. This research analyzes worldwide movie patterns alongside financial behavior that occurred throughout multiple years.
2. Problem Statement  
The project assesses global developments regarding movie genres and revenue patterns together with audience preference patterns. The research established which genres deliver optimal both critical accloation and financial returns and studied relationships between rating scores and revenue success. Research divides its analysis between information about geographical regions and language trends to empower decision-making for stakeholders.
3. Methodology  
   - Data Collection: Merged Movies Dataset (box office, genre, votes)
	  - Data Processing: Cleaning, Transformation
   - Data Visualization: Bar Chart, Pie Chart, Treemap, Heatmap, Stacked Area Chart, Line Chart, Scatter Plot, Choropleth Map
   - Interactive Storytelling: D3.js visualizations embedded on a webpage
 

4. Data Abstraction  
Dataset Details:
Type: Structured Dataset
Dataset 1: https://www.kaggle.com/datasets/ashpalsingh1525/imdb-movies-dataset
Dataset 2: https://www.kaggle.com/datasets/aditya126/movies-box-office-dataset-2000-2024

Merged Dataset Attributes:
names, date_x, score, genre, overview, crew, orig_title, status, orig_lang, budget_x, revenue, country, year, primary_genre, Rank, movie_name, worldwide_gross, domestic_gross, Domestic, foreign_gross, Foreign, Rating, Vote_Count, Production_Countries

Number Of Records: ~2,803 entries
 
Attribute Types:
Nominal: genre, country, status, original_language
Ordinal: rating
Quantitative: revenue, budget, worldwide_gross, vote_count
Temporal: year, date_x
Data Source:
Kaggle – IMDb Movies Dataset
Kaggle – Box Office Dataset 2000–2024

Data Transformation using Python:
* All date attributes received time and date elements as their new format.
* Extracted year from date fields
* The third data processing step eliminated missing values which occurred in revenue and genre categories.
* Normalized revenue columns
* The system retrieved the main genre from the list containing multiple genre entities.
* The outlier data points were managed removing unrealistic entries between budget and revenue numbers.  
5. Task Abstraction  
Target:
The Analyze movie dataset evaluates patterns of business success and critical ratings development in addition to genre trends and national and linguistic market distributions.
   
Actions:
•	An automated system combines revenue with scores across both year and genre segments
•	Filtered movies released after 2000
•	A correlation evaluation was conducted to establish connections between ratings and profits
•	A list of top-performing movies in terms of worldwide box office income was generated
•	Used interactive visualization to create dynamic visual storytelling.
 

6. Implementation Using Tools  
Tools Used:
- Data Cleaning & Transformation: Python (Pandas, Seaborn)
- Visualization Tool: D3.js
- Webpage Development: HTML, CSS, JavaScript

Implementation Steps:
* Merged datasets and cleaned in Python
* Loaded final CSV into D3.js environment
* Created visualizations:
  - Pie Chart (Genre Distribution)
  - Treemap (Revenue by Genre)
  - Correlation Matrix (Movie Financial and Rating Correlations)
  - Stacked Area Chart (Genre Trends Over Time)
  - Line Chart (Average Score per Year)
  - Scatter Plot (Rating vs Revenue)
  - Bar Charts (Top Movies)
  - Bubble Chart (Displays Budget vs Revenue)
* Added interactivity: hover tooltips, clickable legends, filters
* Embedded visualizations into a webpage
7. Results and Analysis  
Tableau: https://public.tableau.com/app/profile/meghana.sadhu7906/viz/MoviesAnalysis_17456910231620/MoviesreleasedperYear  
Webpage : https://meghanasadhu.github.io/movie-trends-analysis/index.html
