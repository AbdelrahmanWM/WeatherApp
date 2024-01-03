function extractHourFromDate(dateString) {
    // Create a Date object from the provided date string
    const date = new Date(dateString);
  
    // Get the hour component from the Date object
    const hour = date.getHours();
  
    return hour;
  }

  function getWeekDay(date){
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayOfWeek];
    return dayName
  }
export { extractHourFromDate,getWeekDay}