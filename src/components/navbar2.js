import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePopup from './profilepopup'

const CenteredNavbar = (props) => {
    const { activeLink, handleLinkClick } = props; // Destructure props
    //console.log(props.userdata);

    const [showrpofilePopup, setShowprofilePopup] = useState(false);
  const handleOpenprofilePopup = () => {
    setShowprofilePopup(true);
  };

  const handleCloseProfilePopup = () => {
    setShowprofilePopup(false);
  };

  const handlelogout = () => {
    props.setloginstatus(false);
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="nav-link" to="/">
          Communify
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-link-group2">
          <li
            className={activeLink === 'stream' ? 'active' : ''}
            onClick={() => handleLinkClick('stream')}
          >
            <a>Feed</a>
          </li>
          <li
            className={activeLink === 'people' ? 'active' : ''}
            onClick={() => handleLinkClick('people')}
          >
            <a>Members</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right2">
      <div className='username2'><Link className="nav-link" onClick={handleOpenprofilePopup}>{props.userdata.fname}</Link></div>
      </div>
      {showrpofilePopup && <ProfilePopup onClose={handleCloseProfilePopup} user={props.userdata} handlelogout={handlelogout}/>}
    </nav>
  );
};

export default CenteredNavbar;
