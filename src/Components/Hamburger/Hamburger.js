import React, { Component } from "react";
import "./Hamburger.css";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router-dom";

class Hamburger extends Component {

    constructor() {
        super();
    
        this.state = {
          open: false
        };
      }

      handleToggle = () => this.setState({ open: !this.state.open });
      
        handleClose = () => this.setState({ open: false });


  render() {
    return (
      <div className="Navbar">


        <div className="Navbar_Split">
        <Link to="/UserLanding">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{margin: '0px 3px 2px 0'}}></i>
          </div>
          </Link>

        <div className="Hamburger_Button">
          <div className="menu-button" onClick={this.handleToggle}>
            <div className="Hamburger_Div" />
            <div className="Hamburger_Div" />
            <div className="Hamburger_Div" />
          </div>
        </div>
        </div>

        <div>
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            openSecondary={true}
            onRequestChange={open => this.setState({ open })}
            containerClassName="drawer"
          >
            <Link to="/Profile" className="link">
            <MenuItem onClick={this.handleClose} className="menu-item">
                Profile
            </MenuItem>
            </Link>

            <Link to="/UserLanding" className="link">
              <MenuItem onClick={this.handleClose} className="menu-item">
                Today
              </MenuItem>
              </Link>
              <Link to="/ExerciseLog" className="link">
              <MenuItem onClick={this.handleClose} className="menu-item">
               Exercise Log
              </MenuItem>
              </Link>
            <a href={process.env.REACT_APP_LOGOUT}>
              <MenuItem onClick={this.handleClose} className="menu-item">
                Logout
              </MenuItem>
            </a>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default Hamburger;