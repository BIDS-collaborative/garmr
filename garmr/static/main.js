"use strict";
(function() {
  var MainForm = React.createClass({
    render: function() {
      return (
        <div className="MainForm">
          <h3>Hello world!</h3>
        </div>
      );
    }
  });

  $(document).ready(function() {
      React.render(<MainForm />,
                            document.getElementById('main'));
  });

}());
