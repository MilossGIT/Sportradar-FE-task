
let events = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize when page loads
window.onload = function () {
    loadEvents();
    showCalendar();
    setupButtons();
};

// Get events from JSON file and localStorage
function loadEvents() {
    // First, load any custom events from localStorage
    const customEvents = JSON.parse(localStorage.getItem('sportradarCustomEvents') || '[]');

    fetch('SportradarGames.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Combine base events with custom events
            events = data.data.concat(customEvents);
            showCalendar();
        })
        .catch(function (error) {
            console.log('Error loading events:', error);
            // If JSON fails, just use custom events (or empty array)
            events = customEvents.slice();
            showCalendar();
        });
}

// Setup button clicks
function setupButtons() {
    document.getElementById('prev-month').onclick = function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        showCalendar();
    };

    document.getElementById('next-month').onclick = function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        showCalendar();
    };

    // Navigation buttons
    document.getElementById('calendar-btn').onclick = function () {
        showPage('calendar');
        setActiveButton('calendar-btn');
    };

    document.getElementById('add-event-btn').onclick = function () {
        showPage('add-event');
        setActiveButton('add-event-btn');
    };

    // Form submit
    document.getElementById('add-event-form').onsubmit = function (e) {
        e.preventDefault();
        addNewEvent();
    };

    // Modal close
    document.getElementById('close-modal').onclick = function () {
        document.getElementById('event-modal').style.display = 'none';
    };

    // Sport filter
    document.getElementById('sport-filter').onchange = function () {
        showCalendar();
    };
}

// Show calendar
function showCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    document.getElementById('current-month').innerHTML = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let calendarHTML = '';

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day other-month"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const month = currentMonth + 1;
        const monthStr = month < 10 ? '0' + month : month;
        const dayStr = day < 10 ? '0' + day : day;
        const dateString = `${currentYear}-${monthStr}-${dayStr}`;

        let hasEvents = false;
        const dayEvents = [];

        // Get selected sport filter
        const selectedSport = document.getElementById('sport-filter').value;

        // Check if this day has events (with filter)
        for (let j = 0; j < events.length; j++) {
            if (events[j].dateVenue === dateString) {
                // Apply sport filter
                if (selectedSport === '' || events[j].sport === selectedSport) {
                    hasEvents = true;
                    dayEvents.push(events[j]);
                }
            }
        }

        let dayClass = 'calendar-day';
        if (hasEvents) {
            dayClass += ' has-events';
        }

        // Check if today
        const today = new Date();
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayClass += ' today';
        }

        calendarHTML += `<div class="${dayClass}" onclick="showEventDetails('${dateString}')">`;
        calendarHTML += `<div class="day-number">${day}</div>`;

        // Add event markers
        if (hasEvents) {
            for (let k = 0; k < dayEvents.length; k++) {
                calendarHTML += '<span class="event-marker"></span>';
            }
        }

        calendarHTML += '</div>';
    }

    document.getElementById('calendar-days').innerHTML = calendarHTML;
}

// Show event details
function showEventDetails(dateString) {
    const dayEvents = [];
    const selectedSport = document.getElementById('sport-filter').value;

    // Find events for this day (with filter)
    for (let i = 0; i < events.length; i++) {
        if (events[i].dateVenue === dateString) {
            // Apply sport filter
            if (selectedSport === '' || events[i].sport === selectedSport) {
                dayEvents.push(events[i]);
            }
        }
    }

    if (dayEvents.length === 0) {
        return;
    }

    let detailsHTML = '';

    for (let i = 0; i < dayEvents.length; i++) {
        const event = dayEvents[i];
        const homeTeam = event.homeTeam ? event.homeTeam.name : 'TBD';
        const awayTeam = event.awayTeam ? event.awayTeam.name : 'TBD';

        detailsHTML += `<div class="event-detail">
            <h3>${homeTeam} vs ${awayTeam}</h3>
            <p><strong>Sport:</strong> ${event.sport}</p>
            <p><strong>Competition:</strong> ${event.originCompetitionName}</p>
            <p><strong>Date:</strong> ${dateString}</p>
            <p><strong>Time:</strong> ${event.timeVenueUTC}</p>
            <p><strong>Status:</strong> ${event.status}</p>`;

        if (event.result && event.result.homeGoals !== null) {
            detailsHTML += `<p><strong>Result:</strong> ${event.result.homeGoals} - ${event.result.awayGoals}</p>`;
        }

        detailsHTML += '</div>';
    }

    document.getElementById('event-details').innerHTML = detailsHTML;
    document.getElementById('event-modal').style.display = 'block';
}

// Add new event
function addNewEvent() {
    const newEvent = {
        dateVenue: document.getElementById('event-date').value,
        timeVenueUTC: document.getElementById('event-time').value + ':00',
        homeTeam: { name: document.getElementById('home-team').value },
        awayTeam: { name: document.getElementById('away-team').value },
        sport: document.getElementById('event-sport').value,
        originCompetitionName: document.getElementById('competition').value,
        status: 'scheduled'
    };

    // Save to localStorage
    const customEvents = JSON.parse(localStorage.getItem('sportradarCustomEvents') || '[]');
    customEvents.push(newEvent);
    localStorage.setItem('sportradarCustomEvents', JSON.stringify(customEvents));

    // Add to current events
    events.push(newEvent);
    showCalendar();

    // Clear form
    document.getElementById('add-event-form').reset();

    // Go back to calendar
    showPage('calendar');
    setActiveButton('calendar-btn');

    alert('Event added successfully! It will persist even after page refresh.');
}

// Show page
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageName + '-page').style.display = 'block';
}

// Set active button
function setActiveButton(buttonId) {
    const buttons = document.querySelectorAll('.nav-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    document.getElementById(buttonId).classList.add('active');
}