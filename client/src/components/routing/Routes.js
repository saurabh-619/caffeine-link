import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";

import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-form/CreateProfile";
import EditProfile from "../profile-form/EditProfile";
import AddExperience from "../profile-form/AddExperience";

import AddEducation from "../profile-form/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import AllLikes from "../posts/AllLikes";
import EditProfilePhoto from "../profile-form/EditProfilePhoto";
import AddCertificate from "../profile-form/AddCertificate";
import About from "../about/About";
import NotFound from "../layout/NotFound";
const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:userId" component={Profile} />
        <Route exact path="/all-likes/:postId" component={AllLikes} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:postId" component={Post} />
        <PrivateRoute
          exact
          path="/add/certificate"
          component={AddCertificate}
        />
        <PrivateRoute exact path="/update/photo" component={EditProfilePhoto} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
