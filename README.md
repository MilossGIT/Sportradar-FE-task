# Sportradar Sports Calendar

A responsive sports event calendar application for viewing and managing sports events.

## Features

- **Monthly Calendar View**: Browse events by month with next/previous navigation
- **Event Markers**: Visual indicators show which days have scheduled events
- **Event Details**: Click on event markers to view detailed information
- **Add New Events**: Create new sports events with a simple form
- **Sport Filtering**: Filter calendar events by sport type (All Sports, Football, Ice Hockey)
- **Persistent Storage**: Added events are saved using localStorage and persist between sessions
- **Responsive Design**: Works on desktop, tablet, and mobile devices with optimized touch targets
- **Smooth Animations**: CSS animations for better user experience including hover effects and transitions
- **Multiple Sports**: Support for football, basketball, ice hockey, tennis, and more

## Setup Instructions

### Quick Start

```bash
# Clone the repository
git clone https://github.com/MilossGIT/Sportradar-FE-task.git
cd Sportradar-FE-task

# Install and start
npm install
npm start
```

The application will open automatically in your browser at http://localhost:3000

### Alternative Setup

If you don't have Node.js, you can run the application using any local web server or by opening `index.html` directly in your browser.

## How to Use

### Calendar Navigation

- Use the **Previous** and **Next** buttons to navigate between months
- Days with events show small colored dots
- Today's date is highlighted in red
- Click on any day with events to see details

### Adding Events

1. Click the **Add Event** button in the navigation
2. Fill out the form with event details (date, time, teams, sport, competition)
3. Click **Add Event** to save
4. The event will appear on the calendar immediately and persist between sessions

### Filtering Events

Use the **Filter by Sport** dropdown to show only events for specific sports:

- All Sports (default)
- Football
- Ice Hockey

### Viewing Event Details

Click on any calendar day that has event markers to open a popup with full event information including teams, time, sport, and competition details.

## Project Structure

```
├── index.html              # Main HTML file
├── script.js              # JavaScript functionality
├── styles.css             # CSS styling and animations
├── SportradarGames.json   # Sample event data
├── test.js                # Test suite
├── package.json           # Project configuration
└── README.md             # Documentation
```

## Technical Details

- **Frontend**: Vanilla HTML, CSS, and JavaScript (ES5 compatible)
- **Data**: JSON file with sports event information
- **Storage**: localStorage for persistent custom events
- **Styling**: CSS Grid and Flexbox for responsive layout
- **Animations**: CSS keyframes and transitions for smooth interactions
- **Colors**: Sportradar brand colors (dark blue #00003c, red #d7242a)
- **Testing**: Node.js based test suite with npm test

## Testing

The application includes tests to verify functionality:

```bash
# Run tests
npm test
```

### Test Coverage

- Required files exist (HTML, CSS, JS, JSON)
- JSON data structure is valid
- HTML contains required elements
- JavaScript has main functions
- CSS includes responsive design
- localStorage implementation
- Package.json configuration

All tests should pass for the application to work correctly.

## Browser Support

Works in all modern browsers including Chrome, Firefox, Safari, and Edge.
