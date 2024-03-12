const currentDayEl = document.querySelector('#currentDay');
const plannerEl = document.querySelector('#planner');
const dailyMessageEl = document.querySelector('#dailyMessage');

// sources the current date and time
function updateTime() {
    let currentDate = dayjs();
// array for daily messages
    let messages = [
        'Happy Sunday',
        'Happy Monday ',
        'Happy Tuesday',
        'Happy Wednesday',
        'Happy Thursday',
        'Happy Friday',
        'Happy Saturday'
    ];
    const dayIndex = currentDate.day();
    dailyMessageEl.textContent = messages[dayIndex];
    // set the time with Month, Day, Years. Hours, Minutes, Seconds AM PM took out 
    currentDayEl.textContent = currentDate.format('MMMM DD YYYY hh:mm A');
}

// call the function and set the interval
updateTime();
setInterval(updateTime, 1000);

// array for different times meridian and a blank string for the reminders text box
let timeList = [
    { 
    time: '7:00', 
    meridian: 'am', 
    reminders: '' },
    {
    time: '8:00', 
    meridian: 'am', 
    reminders: '' 
    },

    { time: '9:00', 
    meridian: 'am', 
    reminders: '' },

    { time: '10:00',
     meridian: 'am',
      reminders: '' },

    { time: '11:00',
     meridian: 'am',
      reminders: '' },

    { time: '12:00',
     meridian: 'pm',
      reminders: '' },

    { time: '1:00', 
    meridian: 'pm', 
    reminders: '' },
    
    {time: '2:00',
     meridian: 'pm',
     reminders: '' },
    
    {time: '3:00', 
    meridian: 'pm', 
    reminders: '' },
    
   {time: '4:00', 
    meridian: 'pm',
    reminders: '' },
    
     { time: '5:00',
      meridian: 'pm',
      reminders: '' },

    { time: '6:00',
      meridian: 'pm',
      reminders: '' },

    { time: '7:00',
      meridian: 'pm',
      reminders: '' }

];

function createTimeRows() {

    for (let i = 0; i < timeList.length; i++) {
        const timeIndex = timeList[i];

        const plannerList = document.createElement('div');
        plannerList.classList.add('time-block', 'row', 'no-gutters');

        // Create column for the time label
        const timeLabelColumn = document.createElement('div');
        timeLabelColumn.classList.add('col-lg-1', 'hour', 'justify-content-sm-end', 'pr-3', 'pt-3');
        timeLabelColumn.classList.add('time-label')
        // concatnates the 
        timeLabelColumn.textContent = timeIndex.time + ' ' + timeIndex.meridian;

        // Create column for the text area
        const textAreaColumn = document.createElement('div');
        textAreaColumn.classList.add('col');
        const plannerInput = document.createElement('textarea');
        plannerInput.classList.add('form-control', 'blockColor');
        // sets the planner input to the time index reminders ''
        plannerInput.value = timeIndex.reminders;
        plannerInput.setAttribute('data-time', timeIndex.time);
        textAreaColumn.appendChild(plannerInput);

 // Color coding based on time
const currentTime = dayjs();
// event time =  dayjs(current time)timeindex time and merdian
const eventTime = dayjs(`${timeIndex.time} ${timeIndex.meridian}`, 'h:mm A');
const hourDifference =eventTime.diff(currentTime,'hour')
// if statement for coloring time boxes according to time
if (hourDifference > 0) {
    plannerInput.style.backgroundColor = 'lightgreen';
    // console log the current time to test only present is working i will resubmit once working
    console.log("Future");
} else if (hourDifference < 0 ) {
    plannerInput.style.backgroundColor = 'violet'; 
    console.log("Past");
} else {
    plannerInput.style.backgroundColor = 'lightpink';
    console.log("Present");
}

        // Create column for the button
        const buttonColumn = document.createElement('div');
        // added bootstrap classes 
        buttonColumn.classList.add('col-auto');
        const saveButton = document.createElement('button');
        saveButton.classList.add('saveBtn', 'btn-block');
        saveButton.type = 'submit';
        // added a floppy to my button
        saveButton.textContent = '💾'; 

        // adds event listner to the current time
        saveButton.addEventListener('click', function () {
            const plannerReminder = plannerInput.value;
            alert('Reminder Set');
            const plannerTime = timeIndex.time;
            localStorage.setItem(plannerTime, plannerReminder);
        });

        buttonColumn.appendChild(saveButton);

        // Appends time text and buttons to the planner list
        plannerList.appendChild(timeLabelColumn);
        plannerList.appendChild(textAreaColumn);
        plannerList.appendChild(buttonColumn);

        // Appends the plannerlist to the html
        plannerEl.appendChild(plannerList);
    } 
}
// invoke function
createTimeRows();
