import React from "react";
import { Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  SkypeLinkInput,
  MaxTuteeInput,
  LectureNoteInput,
  VideoLinkInput,
} from "../components/ClassContent";

function ClassEdit({
  match: {
    params: { id },
  },
  history,
  user,
  classes,
}) {
  const classInfo = classes.filter((_class) => {
    return _class._id === id;
  })[0];
  console.log(classInfo);
  return (
    //TODO 잘못된 사용자 접근 차단
    <Container>
      <h1>안녕하세요! {user.nickname}</h1>

      {classInfo === undefined ? null : (
        <>
          <h2>강의 : {classInfo.className} 관리페이지입니다.</h2>
          <Form>
            <LectureNoteInput classID={id} />
            {classInfo.classType === "RealtimeOnlineCourseType" ? (
              <SkypeLinkInput classID={id} />
            ) : null}
            {classInfo.classType === "OnlineCourseType" ? (
              <VideoLinkInput classID={id} />
            ) : null}
            {classInfo.maxTutee === undefined ? null : (
              <MaxTuteeInput classID={id} classMaxTutee={classInfo.maxTutee} />
            )}
          </Form>
        </>
      )}
    </Container>
  );
}

function maptoProp(state) {
  return { user: state.user, classes: state.class };
}

export default connect(maptoProp)(ClassEdit);
