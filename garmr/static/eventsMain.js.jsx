var GuestForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var department = React.findDOMNode(this.refs.department).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    // TODO: Better validation
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}/igm;
    if (!name || !title || !department) {
      toastr.info("Name, title, and department are required!");
      return;
    }
    else if (/[^a-zA-Z0-9\-\s]/.test(name) || /[^a-zA-Z0-9\-\s]/.test(title) || /[^a-zA-Z0-9\-\/\s]/.test(department)) {
      toastr.info("Name, title, and department can only contain alphanumeric characters and hyphens.");
      return;
    }
    else if (email && !re.test(email)) {
      toastr.info("E-mail must be in correct format");
      return;
    }

    var date = new Date();
    var event = this.props.event_id;

    var data = {name: name,
                title: title,
                department: department,
                email: email,
                date: date.toString(),
                event: event};

    $.ajax({
        url: '/guests/add',
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        processData: false,
        data: JSON.stringify(data)
    });

    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.department).value = '';
    React.findDOMNode(this.refs.email).value = '';
    toastr.success("Thank you!")
    return;
  },
  render: function() {
    return (
      <form className="GuestForm" onSubmit={this.handleSubmit}>
        <div className="row">
        </div>
        <label htmlFor="name">Your Name*</label>
        <input className="u-full-width" type="text" placeholder="John Tukey" ref="name" />
        <label htmlFor="title">Title*</label>
        <input className="u-full-width" type="text" placeholder="Data Scientist" ref="title" />
        <label htmlFor="department">Department*</label>
        <input className="u-full-width" type="text" placeholder="Mathematics" ref="department" />
        <label htmlFor="email">E-mail</label>
        <input className="u-full-width" type="text" placeholder="(optional)" ref="email" />
        <input className="u-full-width button-primary" type="submit" value="Sign in" />
      </form>
    );
  }
});

var GuestPage = React.createClass({
  getInitialState: function() {
    return {guests: []};
  },
  componentDidMount: function() {
    var eventID = window.location.toString().split("/")[4];
    $.ajax({
      url: '/events/' + eventID,
      dataType: 'json',
      cache: false,
      success: function(event) {
        this.setState({event_id:event.id, name:event.name, date:event.date, description:event.description});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('http://0.0.0.0:8080/guests/add', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="guestPage u-vertical-align">
        <div className="container">
          <h1 className="u-center">Welcome to {this.state.name}</h1>
          <h4 className="u-center">{this.state.description}</h4>
          <h5 className="u-center">{this.state.date}</h5>
          <GuestForm event_id={this.state.event_id} />
        </div>
      </div>
    );
  }
})

React.render(
  <GuestPage />,
  document.getElementById('main')
);

