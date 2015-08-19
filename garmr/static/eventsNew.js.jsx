var EventForm = React.createClass({
  componentDidMount: function () {
    jQuery('.datepicker').datetimepicker({
      timepicker:false,
      minDate:'0',//yesterday is minimum date(for today use 0 or -1970/01/01)
      format:'m/d/Y'
    });

    jQuery('.timepicker').datetimepicker({
      datepicker:false,
      format:'H:i'
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var date = React.findDOMNode(this.refs.date).value.trim();
    var startTime = React.findDOMNode(this.refs.startTime).value.trim();
    var endTime = React.findDOMNode(this.refs.endTime).value.trim();
    startTime = startTime.replace(/:/g,'');
    endTime = endTime.replace(/:/g,'');

    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}/igm;
    if (!name || !description || !date || !startTime || !endTime) {
      toastr.info("Name, description, date, and time are required!");
      return;
    }
    if (startTime > endTime) {
      toastr.info("Event cannot end before it starts!");
      return;
    }

    time = startTime + " " + endTime;

    var data = {name: name,
                description: description,
                date: date,
                time: time};

    $.ajax({
        url: '/events/add',
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        processData: false,
        data: JSON.stringify(data)
    });

    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.description).value = '';
    React.findDOMNode(this.refs.date).value = '';
    React.findDOMNode(this.refs.startTime).value = '';
    React.findDOMNode(this.refs.endTime).value = '';
    toastr.success("Thank you!")
    return;
  },
  render: function() {
    return (
      <form className="EventForm" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Event Name*</label>
        <input className="u-full-width" type="text" placeholder="Name" ref="name" />
        <label htmlFor="description">Short Description*</label>
        <input className="u-full-width" type="text" placeholder="Desc" ref="description" />
        <label htmlFor="date">Date of Event*</label>
        <input className = "u-full-width datepicker" type="text" placeholder="01/01/2015" ref="date"/>
        <div className="row">
          <div className="six columns">
            <label htmlFfor="startTime">Start Time*</label>
            <input id="timepicker" className="u-full-width timepicker" type="text" placeholder="12:00" ref="startTime" />
          </div>
          <div className="six columns">
            <label htmlFor="endTime">End Time*</label>
            <input id="timepicker" className="u-full-width timepicker" type="text" placeholder="12:00" ref="endTime" />
          </div>
        </div>
        <input className="u-full-width button-primary" type="submit" value="Create Event" />
      </form>
    );
  }
});

var EventPage = React.createClass({
  render: function() {
    return (
      <div className="eventPage u-vertical-align">
        <div className="container">
          <h1 className="u-center">New Event</h1>
          <EventForm />
        </div>
      </div>
    );
  }
})

React.render(
  <EventPage />,
  document.getElementById('main')
);
