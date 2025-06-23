import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";

function ProfileButton(): JSX.Element {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useAppSelector((store) => store.session.user);
  const ulRef = useRef<any>();
  const navigate = useNavigate();

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e: any) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button onClick={(e) => toggleMenu(e)} id="profile-button">
        <FaUserCircle />
      </button>
      {showMenu && (
        <div id="profile-dropdown-container" ref={ulRef}>
          {user ? (
            <div id="profile-dropdown">
              <h4 className="profile-text">{user.username}</h4>
              <h4 className="profile-text">{user.email}</h4>
              <button
                onClick={() => navigate("/dailyGoals")}
                id="profile-user-profile-button"
              >
                Daily Goals
              </button>
              <button
                onClick={() => navigate("/history")}
                id="profile-user-profile-button"
              >
                History
              </button>
              <button onClick={(e) => logout(e)} id="profile-log-out-button">
                Log Out
              </button>
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
