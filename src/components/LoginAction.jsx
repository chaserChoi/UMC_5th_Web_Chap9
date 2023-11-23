export const login = (userInfo) => {
  userInfo = {
    id: "umcweb",
    pw: "1234",
  };

  return {
    type: "LOGIN",
    payload: userInfo,
  };
};
