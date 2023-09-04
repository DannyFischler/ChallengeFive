document.addEventListener('DOMContentLoaded', function () {
    const calendarDiv = document.getElementById('calendar');
    const now = dayjs();
    const currentDate = dayjs().format('YYYY-MM-DD');

    // Load saved events from local storage
    const savedEvents = JSON.parse(localStorage.getItem('dailyPlannerEvents') || "{}");

    for (let hour = 9; hour <= 17; hour++) {
        const blockTime = dayjs(`${currentDate}T${hour}:00:00`);
        const blockDiv = document.createElement('div');
        const eventInput = document.createElement('input');
        const saveButton = document.createElement('button');

        if (savedEvents[hour]) {
            eventInput.value = savedEvents[hour];
        }

        if (now.isBefore(blockTime)) {
            blockDiv.classList.add('future');
        } else if (now.isAfter(blockTime.add(1, 'hour'))) {
            blockDiv.classList.add('past');
        } else {
            blockDiv.classList.add('present');
        }

        blockDiv.textContent = `${hour}:00 - ${hour + 1}:00`;
        saveButton.textContent = "Save";
        
        blockDiv.appendChild(eventInput);
        blockDiv.appendChild(saveButton);
        calendarDiv.appendChild(blockDiv);

        saveButton.addEventListener('click', function() {
            savedEvents[hour] = eventInput.value;
            localStorage.setItem('dailyPlannerEvents', JSON.stringify(savedEvents));
        });
    }
});
