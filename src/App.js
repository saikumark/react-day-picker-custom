import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.fromMonth = new Date(this.currentYear, this.today.getMonth());
    this.toMonth = new Date();
    this.toMonth.setMonth(this.toMonth.getMonth()+2);

    this.state = {
      selectedDay: this.today, //Set default selected date while loading calendar
      month: this.fromMonth, //From which month the calendar should allow visitor to select
    };
  }

  state = {
    date: new Date(),
    month: this.fromMonth
  }

  handleDayClick(day, modifiers = {}) {
    let errorDiv = document.getElementById("errorMessage")

    if (modifiers.disabled) {
      errorDiv.innerHTML = "Appointment is not available for the selected day";
      return;
    }
    else{
      errorDiv.innerHTML = "Appointment available";
    }
    this.setState({
      selectedDay: modifiers.selected ? undefined : day,
    });
  }

  handleYearMonthChange(month) {
    this.setState({ month:month });
  }

  render() {

    const modifiersStyles = {
      disabled:{
        backgroundColor: '#fff',
        color: '#B2B2B2'
      },
      outside: {
        backgroundColor: '#fff'
      },
      selected: {
        backgroundColor: '#003087'
      },
    };

    const getDisabledDays = (selectedMonth) => {
      let date = new Date(selectedMonth);
      const disabledDays = [];
      
      const excludeDateArray = ["12/3/2019", "12/13/2019","1/1/2020","2/3/2020"];
      while (date.getMonth() === new Date(selectedMonth).getMonth()) {
        //To restrict selecting previous day from current day
        if(date.getMonth() === this.today.getMonth()) {
          if(date.getTime() < this.today.getTime() && date.toLocaleDateString()!=this.today.toLocaleDateString()){
            disabledDays.push(new Date(date));
          }
        }
        //Disable weekend Saturday and Sunday
        else if(date.getDay() === 0 || date.getDay() === 6){
          disabledDays.push(new Date(date));
        }
        //Find specific days mentioned in excludedDates and if found, add it to disabled dates
        else if(excludeDateArray.find((excludedDate) => {
            return excludedDate == date.toLocaleDateString();
          })) 
        {
            disabledDays.push(new Date(date));
        }
        //In order to loop in for each date for the selected month, increment day by 1
        date.setDate(date.getDate() + 1);
      }
      return disabledDays;
    }

    //Identify the dates to be disabled, which will be given as input to calendar
    const disabledDays = getDisabledDays(this.state.month);

    //In order to apply default style for avaialble dates, we need to override as below.
    const allDay = `.DayPicker-Day {
      background-color: #CBE6B1;
      color: white;
    }`;

    return (
      <div className="App">
        <div className="calendar">
          <style>{allDay}</style>
          <DayPicker
            onMonthChange={this.handleYearMonthChange}
            month={this.state.month}
            fromMonth={this.fromMonth}
            toMonth={this.toMonth}
            modifiersStyles = {modifiersStyles}
            disabledDays={disabledDays}
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
          />
        </div>
        <div id="errorMessage"></div>
      </div>
    );
  }
}

export default App;
