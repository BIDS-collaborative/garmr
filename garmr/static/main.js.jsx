var GuestForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var department = React.findDOMNode(this.refs.department).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    // TODO: Better validation
    if (!name || !title || !department) {
      alert("Name, title, and department are required!");
      return;
    }
    // TODO: Pass this back to Morepath server
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.department).value = '';
    React.findDOMNode(this.refs.email).value = '';
    return;
  },
  render: function() {
    return (
      <form className="GuestForm" onSubmit={this.handleSubmit}>
        <div className="row">
        </div>
        <label for="name">Your Name*</label>
        <input className="u-full-width" type="text" placeholder="John Tukey" ref="name" />
        <label for="title">Title*</label>
        <input className="u-full-width" type="text" placeholder="Data Scientist" ref="title" />
        <label for="department">Department*</label>
        <input className="u-full-width" type="text" placeholder="Mathematics" ref="department" />
        <label for="email">E-mail</label>
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
