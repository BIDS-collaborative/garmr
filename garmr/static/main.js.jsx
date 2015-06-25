var GuestPage = React.createClass({
  render: function() {
    return (
      <div className="guestPage">
        <h1>Welcome to BIDS!</h1>
        <GuestForm />
      </div>
    );
  }
})

var GuestForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var department = React.findDOMNode(this.refs.department).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    if (!name || !title || !department) {
      alert("Name, title, and department are required!")
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
        <input type="text" placeholder="Name" ref="name" />
        <input type="text" placeholder="Tite" ref="title" />
        <input type="text" placeholder="Department" ref="department" />
        <input type="text" placeholder="E-mail (optional)" ref="email" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

React.render(
  <GuestPage />,
  document.getElementById('main')
);
