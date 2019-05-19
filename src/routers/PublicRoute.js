import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({isAuthenticated: isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Redirect to="/dashboard"/>
      </div>
      ) : (
        <Component  {...props}/>
      )
  )} />
);
  
 const mapStateToProps = (state) => ({
   isAuthenticated: !!state.auth.uid // flip to boolean value
 });

 export default connect(mapStateToProps)(PublicRoute);