import axios from "axios";
import Cookies from "js-cookie";

const LOGIN_URL =
  "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";

const REFERRALS_URL =
  "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";

export const loginUser = async (email, password) => {
  const response = await axios.post(LOGIN_URL, {
    email,
    password,
  });

  return response.data;
};

export const getDashboardData = async (
  search = "",
  sort = "desc"
) => {
  const token = Cookies.get("jwt_token");

  const response = await axios.get(
    REFERRALS_URL,
    {
      params: {
        search,
        sort,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getReferralById = async (id) => {
  const token = Cookies.get("jwt_token");

  const response = await axios.get(
    REFERRALS_URL,
    {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};