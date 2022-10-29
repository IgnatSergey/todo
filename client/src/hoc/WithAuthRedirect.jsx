import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthStatus } from "../redux/auth-selector";

let mapStateToProps = (state) => ({
    isAuth: getAuthStatus(state)
  })

export const WithAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) {
        return <Navigate to={"/login"} />;
      }
      return <Component {...this.props} />;
    }
  }

  const ConnectedAuthRedirectComponent = connect(mapStateToProps) (RedirectComponent );
  return ConnectedAuthRedirectComponent;
};