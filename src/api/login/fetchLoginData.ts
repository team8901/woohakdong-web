import axios from "axios";

export type LoginData = {
  accessToken: string;
  refreshToken: string;
};

export const fetchLoginData = async (accessToken: string) => {
  try {
    // const res = await axios.post<LoginData>(`/api/v1/auth/login/social`, {
    //   accessToken,
    // });
    const res = await axios.post<LoginData>(
      `${import.meta.env.VITE_API_URL}/v1/auth/login/social`,
      {
        accessToken,
      }
    );
    console.log(`/api/auth/login/social`, res);
    return res.data;
  } catch (error) {
    console.error(`/api/auth/login/social`, error);
  }
};
