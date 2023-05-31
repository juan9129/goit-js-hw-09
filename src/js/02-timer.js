import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate <= new Date()) {
        window.alert("por favor seleccione una fecha en el futuro");
        return;
      }

      const startButton = document.querySelector('button[data-start]');
      startButton.disabled = false; 
    },
  };

  const flatpickrInstance = flatpickr("#datetime-picker", options);

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function updateTimer() {
    const now = new Date();
    const selectedDate = flatpickrInstance.selectedDates[0];
    const timeRemaining = selectedDate - now;
  
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
  
      const startButton = document.querySelector('button[data-start]');
      startButton.disabled = true;
  
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }

  let timerInterval;

  document.querySelector('button[data-start]').addEventListener('click', () => {
    const selectedDate = flatpickrInstance.selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      window.alert("por favor seleccione una fecha en el futuro");
      return;
    }
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  });

  const timerFields = document.querySelectorAll('.timer .field');
  timerFields.forEach(field => {
  field.style.display = 'inline-block';
  field.style.marginRight = '10px';
  field.style.fontSize = '20px';
  });
  