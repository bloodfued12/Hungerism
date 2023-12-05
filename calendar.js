document.addEventListener("DOMContentLoaded", function () {
    const datesContainer = document.getElementById('dates-container');
    const eventForm = document.getElementById('eventForm');
    const modal = document.getElementById('eventModal');
    const closeBtn = document.querySelector('.close');

    // Mock data for demonstration
    let eventsData = [
        { date: '2023-12-01', title: 'Meeting', time: '10:00' },
        { date: '2023-12-05', title: 'Lunch', time: '12:30' },
        { date: '2023-12-10', title: 'Webinar', time: '15:00' },
    ];

    renderCalendar(eventsData);

    function renderCalendar(events) {
        const currentDate = new Date();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDateElement = document.createElement('div');
            emptyDateElement.classList.add('date', 'empty');
            datesContainer.appendChild(emptyDateElement);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = i;

            const eventsForDate = events.filter(event => new Date(event.date).getDate() === i);
            if (eventsForDate.length > 0) {
                dateElement.classList.add('event');
                dateElement.setAttribute('data-events', JSON.stringify(eventsForDate));
            }

            dateElement.addEventListener('click', handleDateClick);
            datesContainer.appendChild(dateElement);
        }
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.textContent = i;

        const eventsForDate = events.filter(event => new Date(event.date).getDate() === i);
        if (eventsForDate.length > 0) {
            dateElement.classList.add('event');
            dateElement.setAttribute('data-events', JSON.stringify(eventsForDate));
        }

        dateElement.addEventListener('click', handleDateClick);
        datesContainer.appendChild(dateElement);
    }


    function handleDateClick(event) {
        const dateElement = event.target;
        const eventsData = dateElement.getAttribute('data-events');

        if (eventsData) {
            const events = JSON.parse(eventsData);
            showEventModal(events);
        } else {
            showEventModal();
        }
    }

    function showEventModal(events = []) {
        
        // Show the form in the modal
        const formClone = eventForm.cloneNode(true);
        modalContent.appendChild(formClone);

        closeBtn.addEventListener('click', closeEventModal);
        eventForm.addEventListener('submit', handleEventFormSubmit);
    }

    function closeEventModal() {
        modal.style.display = 'none';
    }

    function handleEventFormSubmit(event) {
        event.preventDefault();

        const eventTitle = document.getElementById('eventTitle').value;
        const eventTime = document.getElementById('eventTime').value;

        const selectedDate = document.querySelector('.date.selected');
        if (selectedDate) {
            const date = selectedDate.textContent;
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

            const newEvent = { date: formattedDate, title: eventTitle, time: eventTime };

            // Update the events for the selected date
            let eventsForDate = selectedDate.getAttribute('data-events');
            eventsForDate = eventsForDate ? JSON.parse(eventsForDate) : [];
            eventsForDate.push(newEvent);
            selectedDate.setAttribute('data-events', JSON.stringify(eventsForDate));

            // Update the global eventsData array
            eventsData = eventsData.concat([newEvent]);

            // Rerender the calendar
            datesContainer.innerHTML = '';
            renderCalendar(eventsData);

            // Close the modal
            closeEventModal();
        }
    }
});
