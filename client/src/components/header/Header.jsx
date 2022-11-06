import { connect } from "react-redux";
import { getLogin } from "../../redux/auth-selector";
import { setMyProfileData } from "../../redux/auth-reducer";
import headerLogo from "../../assets/images/pulse_icon.svg";

export const Header = (props) => {
  return (
    <div className="header">
      <div className="header__logo-container">
        <p className="header__logo-text">
          <b>ToDoIt</b>
        </p>
        <img className="header__logo-img" src={headerLogo} alt="" />
      </div>
      {props.login && (
          <div className="header__loginOut">
            <b>{props.login} - </b>
            <button
              className="button"
              onClick={() => {
                localStorage.removeItem("token");
                props.setMyProfileData(null, null, null, false);
              }}
            >
              Выйти
            </button>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: getLogin(state),
  };
};

export default connect(mapStateToProps, {
  setMyProfileData
})(Header);
