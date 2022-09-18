import { Component } from 'react';
import { Link } from 'react-router-dom';
import "./NotFoundPage.style.css"

class NotFoundPage extends Component  {
  render() {
    return (
      <div className="Container">
        <div className="Row">
          <h2 className="Header">Not Found 404</h2>
          <span className="Title">page not found !</span>
          <p className="Text">
            Go back to the
            <Link to="/">Homepage</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
