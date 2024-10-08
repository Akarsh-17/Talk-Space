import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import socket from "../../socket";
const MainCopy = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const handleUserExistError = ({ error }) => {
      if (!error) {
        const userName = userRef?.current?.value;
        const roomName = roomRef?.current?.value;

        if (userName && roomName) {
          sessionStorage.setItem('user', userName);
          props.history.push(`/room/${roomName}`);
          console.log(userName, roomName);
        }
      } else {
        setErr(error);
        setErrMsg('User name already exists');
      }
    };

    socket.on('FE-error-user-exist', handleUserExistError);

    return () => {
      socket.off('FE-error-user-exist', handleUserExistError);
    };
  }, [props.history]);

  const handleJoin = () => {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!userName || !roomName) {
      setErr(true);
      setErrMsg("All fields are Necessary");
    } else {
      socket.emit("BE-check-user", { roomId: roomName, userName });
    }
  };
  return (
    <Container>
      <Row>
        <Label htmlFor="userName">Name</Label>
        <Input type="text" id="userName" ref={userRef}/>
      </Row>
      <Row>
        <Label htmlFor="roomName">RoomId</Label>
        <Input type="text" ref={roomRef} id="roomName"/>
      </Row>
      <JoinButton onClick={handleJoin}>Join</JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
    </Container>
  );
};

export default MainCopy;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
`;
const Label = styled.label``;

const Input = styled.input`
  width: 150px;
  height: 30px;
  border: 2px solid black;
  border-radius: 4px;
  margin-left: 7px;
  padding: 2px;
`;

const JoinButton = styled.button`
  border: 0;
  height: 40px;
  outline: none;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 3px;
  background: #8c7569;
  /* padding: 1.2rem 3.2rem; */
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background: #55311c;
  }
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;
