import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./LoginAction";
import axios from "axios";

const LoginPage = () => {
  const url = "/api-docs";

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id || !pw) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(url, {
        id,
        pw,
      });
      switch (response.data.code) {
        case 200:
          dispatch(login(response.data.userInfo));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.userInfo.id);
          setTimeout(() => {
            setLoading(false);
            alert("로그인에 성공하였습니다.");
          }, 1500);
          break;
        case 400:
          throw new Error("body 값이 비어 있습니다.");
        case 404:
          throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
        default:
          throw new Error("알 수 없는 오류입니다.");
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          아이디:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          로그인
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default LoginPage;
