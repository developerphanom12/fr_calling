export const UserDetails = (data) => {
  return {
    type: "USER_DETAILS",
    payload: data,
  };
};
export const userDataAction = (data) => {
  return {
    type: "USER_DATA",
    payload: data,
  };
};
export const userCheckAction = (data) => {
  return {
    type: "USER_CHECK",
    payload: data,
  };
};

export const appDetailsAction = (data) => {
  return {
    type: "APP_DETAILS",
    payload: data,
  };
};
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalType) => ({
  type: "OPEN_MODAL",
  payload: {
    modalType,
  },
});

export const closeModal = () => ({
  type: "CLOSE_MODAL",
});


export const setOtpVerified = (isVerified) => ({
  type: "SET_OTP_VERIFIED",
  payload: isVerified,
});