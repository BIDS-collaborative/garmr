var Guest = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.title}</td>
        <td>{this.props.department}</td>
        <td>{this.props.email}</td>
      </tr>
    )
  }
})

var GuestList = React.createClass({
  render: function() {
    rows = [];
    this.props.guests.forEach(function(guest) {
      rows.push(<Guest name={guest.name} title={guest.title} department={guest.department} email={guest.email} key={guest.email} />);
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
    $.ajax({
      url: 'http://0.0.0.0:8080/guests/',
      dataType: 'json',
      cache: false,
      success: function(guests) {
        this.setState({guests: guests.guests});
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
          <h1 className="u-center">Guests</h1>
          <GuestList guests={this.state.guests} />
        </div>
      </div>
    );
  }
})

React.render(
  <ViewGuestPage/>,
  document.getElementById('main')
);
