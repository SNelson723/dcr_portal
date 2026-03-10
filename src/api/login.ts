import axios from "axios";

export const login = async (
  url: string,
  username: string,
  password: string,
) => {
  const json = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: `${url}auth/login`,
    data: { username, password },
  });
  return json;
};
