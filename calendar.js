let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Add your Google Calendar API key and calendar ID here
const API_KEY = 'YOUR_API_KEY';
const CALENDAR_ID = 'YOUR_CALENDAR_ID'; // e.g. yourname@gmail.com or a public calendar ID

async function fetchGoogleEvents(year, month) {
  const timeMin = new Date(year, month, 1).toISOString();
  const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    // Returns an object: { day: [{ summary, url }, ...], ... }
    const events = {};
    for (const item of data.items || []) {
      const day = new Date(item.start.dateTime || item.start.date).getDate();
      if (!events[day]) events[day] = [];
      events[day].push({
        summary: item.summary,
        url: item.htmlLink
      });
    }
    return events;
  } catch (e) {
    console.error('Failed to fetch Google Calendar events:', e);
    return {};
  }
}

async function renderCalendar(year, month) {
  const container = document.getElementById('calendar');
  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const today = new Date();

  // Fetch events (remove this block if not using Google Calendar)
  const events = await fetchGoogleEvents(year, month);

  let html = `
    <div id="cal-header">
      <button onclick="prevMonth()">&#8592;</button>
      <span>${monthNames[month]} ${year}</span>
      <button onclick="nextMonth()">&#8594;</button>
    </div>
    <div id="cal-grid">
      <div class="cal-dow">Su</div>
      <div class="cal-dow">Mo</div>
      <div class="cal-dow">Tu</div>
      <div class="cal-dow">We</div>
      <div class="cal-dow">Th</div>
      <div class="cal-dow">Fr</div>
      <div class="cal-dow">Sa</div>
  `;

  // Empty cells before the 1st
  for (let i = 0; i < startDay; i++) {
    html += `<div class="cal-day empty"></div>`;
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const dayEvents = events[d] || [];
    const eventsHtml = dayEvents.map(e =>
      `<a class="cal-event" href="${e.url}" target="_blank">${e.summary}</a>`
    ).join('');

    html += `
      <div class="cal-day${isToday ? ' today' : ''}">
        <span class="cal-date">${d}</span>
        ${eventsHtml}
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar(currentYear, currentMonth);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar(currentYear, currentMonth);
}

renderCalendar(currentYear, currentMonth);