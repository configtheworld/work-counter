import axios from "axios";
import type { UserType } from "~/types/User";

export const useCounters = () => {
  const getCounters = async () => {
    const userCookie = useCookie<UserType>("user");

    try {
      const response = await axios.get("/api/counters", {
        headers: {
          Authorization:
            "Bearer " + userCookie.value.user.stsTokenManager.accessToken,
        },
      });
      if (response.data.status === 401) {
        throw new Error("token Expired");
      } else {
        return response.data.payload;
      }
    } catch (error) {
      userCookie.value.token = "";
      navigateTo("/signin");
      console.error("Error fetching counters:", error);
    }
  };

  const getCounterById = async (id: string) => {
    const userCookie = useCookie<UserType>("user");

    try {
      const response = await axios.get(`/api/counter-id?id=${id}`, {
        headers: {
          Authorization:
            "Bearer " + userCookie.value.user.stsTokenManager.accessToken,
        },
      });
      if (response.data.status === 401) {
        throw new Error("token Expired");
      } else {
        return response.data.payload;
      }
    } catch (error) {
      userCookie.value.token = "";
      navigateTo("/signin");
      console.error("Error fetching counter:", error);
    }
  };

  const deleteCounterById = async (id: string) => {
    const userCookie = useCookie<UserType>("user");

    try {
      const response = await axios.delete(`/api/counter-id?id=${id}`, {
        headers: {
          Authorization:
            "Bearer " + userCookie.value.user.stsTokenManager.accessToken,
        },
      });
      if (response.data.status === 401) {
        throw new Error("token Expired");
      } else {
        return response.status;
      }
    } catch (error) {
      userCookie.value.token = "";
      navigateTo("/signin");
      console.error("Error fetching counter:", error);
    }
  };

  function minutesCalculator(timeArr: Array<string>) {
    timeArr[0] = timeArr[0] ? timeArr[0] : "0";
    timeArr[1] = timeArr[1] ? timeArr[1] : "0";
    timeArr[2] = timeArr[2] ? timeArr[2] : "0";
    timeArr[3] = timeArr[3] ? timeArr[3] : "0";

    return (
      parseInt(timeArr[0]) * 600 +
      parseInt(timeArr[1]) * 60 +
      parseInt(timeArr[2]) * 10 +
      parseInt(timeArr[3])
    );
  }

  return {
    getCounters,
    minutesCalculator,
    getCounterById,
    deleteCounterById,
  };
};
