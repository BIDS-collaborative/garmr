var Event = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.date}</td>
        <td>{this.props.time}</td>
        <td><a href={this.props.signin}>Event Sign-in</a></td>
        <td><a href={this.props.guests}>Guests</a></td>
      </tr>
    )
  }
})

var EventList = React.createClass({
  render: function() {
    rows = [];
    this.props.events.forEach(function(event) {
      var key = event.name + " " + event.date + " " + event.time;
      var humanTime = event.time.slice(0,2) + ":" + event.time.slice(2,4) + "-" + event.time.slice(5,7) + ":" + event.time.slice(7,9);
      var signinArray = window.location.toString().split("/");
      signinArray.pop();
      signinArray.push(event.id);
      signinArray.push("new-guest");
      signin = signinArray.join('/');
      var guestsArray = window.location.toString().split("/");
      guestsArray.pop();
      guestsArray.pop();
      guestsArray.push('guests/' + event.id + '/view');
      guests = guestsArray.join('/');

      rows.push(<Event name={event.name} date={event.date} time={humanTime} key={key} signin={signin} guests={guests}/>);
    })
    return (
      <div className="row">
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Sign-in</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div> );
  }
});

var ViewEventPage = React.createClass({
  getInitialState: function() {
    return {events: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: '/events/',
      dataType: 'json',
      cache: false,
      success: function(events) {
        this.setState({events: events.events, next: events.next, previous: events.previous});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('http://0.0.0.0:8080/events/add', status, err.toString());
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
        success: function(events) {
          this.setState({events: events.events, next: events.next, previous: events.previous});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('http://0.0.0.0:8080/events/add', status, err.toString());
        }.bind(this)
      });
  },
  render: function() {
    return (
      <div className="eventPage">
        <div className="container">
          <h1 className="u-center">Events</h1>
          <EventList events={this.state.events} />
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
  <ViewEventPage/>,
  document.getElementById('main')
);
