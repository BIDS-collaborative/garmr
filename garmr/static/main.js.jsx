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
    else if (/[^a-zA-Z0-9\-\s]/.test(name) || /[^a-zA-Z0-9\-\s]/.test(title) || /[^a-zA-Z0-9\-\s]/.test(department)) {
      toastr.info("Name, title, and department can only contain alphanumeric characters and hyphens.");
      return;
    }
    else if (email && !re.test(email)) {
      toastr.info("E-mail must be in correct format");
      return;
    }

    var date = new Date();
    var event = null;

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
  render: function() {
    return (
      <div className="guestPage u-vertical-align">
        <div className="container">
          <h1 className="u-center">Welcome to BIDS!</h1>
          <h4 className="u-center">Please sign in below.</h4>
          <GuestForm />
        </div>
      </div>
    );
  }
})

React.render(
  <GuestPage />,
  document.getElementById('main')
);
