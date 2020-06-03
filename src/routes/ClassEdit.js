import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  SkypeLinkInput,
  MaxTuteeInput,
  LectureNoteInput,
  VideoLinkInput,
  AddCourse,
} from "../components/ClassContent";
import Axios from "axios";
import { URL } from "../components/App";
import { Link } from "react-router-dom";

function ClassEdit({
  match: {
    params: { id },
  },
  user,
}) {
  const [classInfo, setClassInfo] = useState(undefined);
  if (classInfo === undefined) {
    Axios.get(URL + "class/" + id).then(({ data }) => {
      setClassInfo(data);
    });
  }

  return (
    //TODO 잘못된 사용자 접근 차단
    <Container>
      <h1>안녕하세요! {user.nickname}</h1>
      {classInfo === undefined ? null : (
        <>
          <h2>강의 : {classInfo.className} 관리페이지입니다.</h2>
          <Form>
            {classInfo.classType === "OnlineCourseType" ? (
              <VideoLinkInput classID={id} />
            ) : (
              <>
                <AddCourse classID={id} />
                <LectureNoteInput classID={id} />
              </>
            )}
            {classInfo.classType === "RealtimeOnlineCourseType" ? (
              <SkypeLinkInput classID={id} />
            ) : null}
            {classInfo.maxTutee === undefined ? null : (
              <MaxTuteeInput classID={id} classMaxTutee={classInfo.maxTutee} />
            )}
          </Form>
          <Link to={"../" + id}>
            <Button block>돌아가기</Button>
          </Link>
        </>
      )}
    </Container>
  );
}

function maptoProp(state) {
  return { user: state.user, classes: state.class };
}

export default connect(maptoProp)(ClassEdit);
