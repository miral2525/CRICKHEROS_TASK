# CricHeroes NRR & Range Calculator  
*Full-Stack Assignment | HTML • CSS • JavaScript*

## 🏏 Project Overview  
This project implements a *Net Run Rate (NRR) and performance-range calculator* for the IPL-style points table scenario described in the “CricHeroes Semi Final Match” assignment.  
It allows you to determine what a team must do in its next match (batting first or chasing) in order to reach a desired ladder position.  
It includes:  
- Calculation of NRR from runs, overs for/against  
- Dynamic range search (minimum / maximum) for runs to restrict or overs to chase  
- Modular code in JavaScript, with clean naming & comments  
- Frontend in HTML + CSS + JS (no database)  
- Unit test cases using Jest

- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **Testing:** Jest (unit tests)  
- **Data Storage:** In-memory / local JSON file — no external database
  
- ## 📋 Features  
- User input for: team names, opposition, overs, toss result, runs scored/chased, desired position  
- NRR computation using formula: (Runs For / Overs For) – (Runs Against / Overs Against)  
- Range computation:  
