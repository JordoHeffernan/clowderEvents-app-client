import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import '../../css/landing-page.css'

export class LandingPage extends React.Component {
  // If we are logged in redirect straight to the user's dashboard
  // componentWillMount() {
  //   this.visited = localStorage.getItem('alreadyVisited');
  // }

  // componentDidMount() {
  //   localStorage.setItem('alreadyVisited', true);
  // }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div className="landingpage" >
        <img src="landing-page.jpg" className="bg" alt="many hands working on calendar"/>
          <h2 className="motto">PLAN EVENTS SMARTER. FASTER. EASIER.</h2>
        
            <h3 className="subMotto">Event planning can feel like herding cats. Let us help.</h3>
          <br />
          <div className="nav">
            <Link className="signup-button" to="/signup" ><button>Sign Up</button></Link>
            <span>or</span>
            <Link className="login-button" to="/login" ><button>Log In</button></Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
