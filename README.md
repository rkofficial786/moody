# 🌈 Mood Journal - Your Emotional Wellness Companion

## 📝 Overview

Mood Journal is an intuitive web application designed to help you track, understand, and improve your emotional well-being. By combining mood logging, weather insights, and personal reflections, this app provides a holistic approach to mental health tracking. 


Live Link : https://moody-one.vercel.app/

## ✨ Features

### 🎭 Mood Tracking
- Record daily moods with expressive emoji representations
- Select from multiple mood categories
- Add personal notes to each entry
- Visualize mood trends over time

### 🌦️ Weather Integration
- Automatic location-based weather data
- Correlate mood with daily weather conditions
- Display temperature, humidity, and weather description

### 📊 Data Visualization
- Calendar view of mood entries
- Mood filter and sorting options
- Export entries to PDF or CSV
- Dark mode support

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Persistent Storage

### Additional Libraries
- [Hero Icons](https://heroicons.com/) - Iconic SVG icons
- [jsPDF](https://artskydnet.github.io/jspdf-autotable/) - PDF Generation
- [html2canvas](https://html2canvas.hertzen.com/) - HTML to Canvas Rendering

### External APIs
- [OpenWeatherMap](https://openweathermap.org/api) - Weather Data

## 🛠️ Prerequisites

- Node.js (v16 or later)
- npm or Yarn
- OpenWeatherMap API Key

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/rkofficial786/moody
cd moody
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```


## 🌟 Key Components

### Mood Selector
- Interactive mood selection
- Emoji representation
- Color-coded mood states

### Weather Integration
- Geolocation-based weather fetching
- Real-time weather data display
- Weather icon representation

### Journal Entry Management
- Add, view, and delete entries
- Export functionality (PDF/CSV)
- Local storage persistence

## 🔐 State Management

Uses Redux Toolkit with:
- Async thunks for API calls
- Persistent storage
- Centralized state management

## 🎨 Styling

- Fully responsive design
- Dark mode support
- Tailwind CSS utility classes
- Custom color themes

## 🔍 Export Options

### PDF Export
- Comprehensive entry details
- Professionally formatted
- Includes mood, notes, and weather information

### CSV Export
- Easy data portability
- Compatible with spreadsheet software





## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌈 Connect

- LinkedIn: https://www.linkedin.com/in/rupraj-singh/

---

**Made with ❤️ and a passion for mental wellness**