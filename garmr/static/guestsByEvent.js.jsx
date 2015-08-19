var Guest = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.title}</td>
        <td>{this.props.department}</td>
        <td>{this.props.email}</td>
        <td>{this.props.date}</td>
        <td>{this.props.event}</td>
      </tr>
    )
  }
})

var GuestList = React.createClass({
  render: function() {
    rows = [];
    this.props.guests.forEach(function(guest) {
      var key = guest.id + " " + guest.email + " " + guest.event;
      rows.push(<Guest name={guest.name} title={guest.title} department={guest.department} email={guest.email} date={guest.date} event={guest.event} key={key}/>);
    })
    return (
      <div className="row">
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Department</th>
              <th>E-mail</th>
              <th>Date</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div> );
  }
});

var ViewGuestPage = React.createClass({
  getInitialState: function() {
    return {guests: []};
  },
  componentDidMount: function() {
    var eventID = window.location.toString().split("/")[4];
    $.ajax({
      url: '/guests-by-event/' + eventID,
      dataType: 'json',
      cache: false,
      success: function(guests) {
        this.setState({guests: guests.guests, next: guests.next, previous: guests.previous});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('http://0.0.0.0:8080/guests/add', status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: '/events/' + eventID,
      dataType: 'json',
      cache: false,
      success: function(event) {
        this.setState({eventName: event.name, eventDate: event.date});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('http://0.0.0.0:8080/guests/add', status, err.toString());
      }.bind(this)
    });
  },
  handlePrevious: function() {
      this.reload(this.state.previous);
  },
  handleNext: function() {
      this.reload(this.state.next);
  },
  reload: function(url) {
      if (url === null) {
          return;
      }
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        success: function(guests) {
          this.setState({guests: guests.guests, next: guests.next, previous: guests.previous});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('http://0.0.0.0:8080/guests/add', status, err.toString());
        }.bind(this)
      });
  },
  render: function() {
    return (
      <div className="guestPage">
        <div className="container">
          <h1 className="u-center">Guests for {this.state.eventName}</h1>
          <h4 className="u-center">{this.state.eventDate}</h4>
          <GuestList guests={this.state.guests} queryString={this.state.queryString}/>
          <div className="row">
            {this.state.previous ? <button className="u-pull-left" onClick={this.handlePrevious}>Previous</button> : false }
            {this.state.next ? <button className="u-pull-right" onClick={this.handleNext}>Next</button> : false }
          </div>
        </div>
      </div>
    );
  }
})

React.render(
  <ViewGuestPage/>,
  document.getElementById('main')
);
