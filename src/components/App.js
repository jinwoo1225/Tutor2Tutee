import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "../components/Navigation";
import Home from "../routes/Home";
import About from "../routes/About";
import Class from "../routes/Class";
import ClassEdit from "../routes/ClassEdit";
import Login from "../routes/Login";
import Register from "../routes/Register";
import MakeClass from "../routes/MakeClass";
import User from "../routes/User";
import { updateClass, updateUser, logout } from "../store";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//서버주소
export const URL = "http://localhost:3000/";

export const classTypes = [
  "온라인 실시간",
  "온라인 동영상",
  "온라인 질의응답",
  "오프라인 질의응답",
];
export const classTypesRaw = [
  "RealtimeOnlineCourseType",
  "OnlineCourseType",
  "QnAType",
  "OfflineType",
];
export const statesRaw = ["Prepare", "Joinable", "Ended"];
export const states = ["준비중", "참가가능", "완료"];

function App({ dispatchUser, dlogout, dispatchClass }) {
  //초기 시작되면 사용자의 세션이 남아있는 서버에 확인
  checkAuth({ dispatchUser, dlogout });
  // 모든 클래스를 불러오는 함수
  checkClass({ dispatchClass });
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/user" exact component={User} />
      <Route path="/user/login" component={Login} />
      <Route path="/user/register" component={Register} />
      <Route path="/class/id/:id" exact component={Class} />
      <Route path="/class/id/:id/edit" exact component={ClassEdit} />
      <Route path="/class/new" exact component={MakeClass} />
    </Router>
  );
}

//현재 세션이 유효한지 확인하는 function
export const checkAuth = ({ dispatchUser, dlogout }) => {
  Axios.get(URL + "auth/isAuthenticated")
    .then((response) => {
      if (response.data === "fail") {
        dlogout();
        return false;
      } else {
        dispatchUser(response.data);
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
      alert("failed to get authentication");
    });
};

//모든 Class를 업데이트하는 function
export function checkClass({ dispatchClass }) {
  Axios.get(URL + "class/name/all")
    .then((response) => {
      dispatchClass(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//store.js
function mapDispatchToProps(dispatch) {
  return {
    dispatchClass: (classes) => dispatch(updateClass(classes)),
    dispatchUser: (data) => dispatch(updateUser(data)),
    dlogout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(App);
