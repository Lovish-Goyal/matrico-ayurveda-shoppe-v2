import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import styles from "./Nav.module.css";

function Nav() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      logoutUser();
      alert("Logged out successfully!");
      navigate("/");
      setDropdownOpen(false);
      setSidebarOpen(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoContainer}>
        <img src="/images/Logo.png" alt="Metrico Ayurveda Shoppe Logo" className={styles.logoImage} />
        <span className={styles.logoText}>Metrico Ayurveda Shoppe</span>
      </Link>

      {/* Mobile Hamburger */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        ☰
      </div>

      {/* Desktop Nav List */}
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            HOME
          </Link>
        </li>
        {user && (
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              DASHBOARD
            </Link>
          </li>
        )}
        <li className={styles.navItem}>
          <Link to="/about" className={styles.navLink}>
            ABOUT
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/ayur_store" className={styles.navLink}>
            AYUR STORE
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/daily_tips" className={styles.navLink}>
            AYURVEDIC TIPS
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/contact" className={styles.navLink}>
            CONTACT US
          </Link>
        </li>
      </ul>

      {/* Desktop Auth */}
      <div className={styles.authContainer} ref={dropdownRef}>
        {user ? (
          <div className={styles.userInfo} onClick={toggleDropdown}>
            <AiOutlineUser className={styles.userIcon} />
            <span className={styles.username}>{user.username}</span>
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>User Profile</div>
                <p style={{ marginTop: "15px" }}>
                  <strong>Name:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.login}>
              LOGIN
            </Link>
            <Link to="/register" className={styles.register}>
              REGISTER
            </Link>
          </>
        )}
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className={styles.sidebar}>
          <IoMdClose className={styles.closeBtn} onClick={toggleSidebar} />
          <ul className={styles.sidebarLinks}>
            <li>
              <Link to="/" onClick={toggleSidebar}>
                HOME
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" onClick={toggleSidebar}>
                  DASHBOARD
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" onClick={toggleSidebar}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/ayur_store" onClick={toggleSidebar}>
                AYUR STORE
              </Link>
            </li>
            <li>
              <Link to="/daily_tips" onClick={toggleSidebar}>
                AYURVEDIC TIPS
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleSidebar}>
                CONTACT US
              </Link>
            </li>
            {user ? (
              <>
                <li className={styles.mobileUser}>
                  <AiOutlineUser /> {user.username}
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    LOGOUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={toggleSidebar}>
                    LOGIN
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={toggleSidebar}>
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
