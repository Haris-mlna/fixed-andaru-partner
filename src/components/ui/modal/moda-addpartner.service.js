import { Client } from "../../../utils/api/api";

export const requestPartnership = async (partnerId, messages) => {
  const body = {
    actionController: "partnercontroller",
    actionName: "RequestPartnership",
    actionParam: {
      message: messages,
      partnerIdList: [partnerId],
    },
  };

  try {
    const res = await Client.post("/action", body);

    return res;
  } catch (error) {
    console.log(error);
  }
}