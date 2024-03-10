// UserReducer.js
const initialState = {
  user: {},
  userCheck: false,
  role: "",
  appDetails: {},
  modalIsOpen: false,
  modalType: null,
  isOtpVerified: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DATA":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_CHECK":
      return {
        ...state,
        userCheck: action.payload,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modalIsOpen: true,
        modalType: action.payload.modalType,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modalIsOpen: false,
        modalType: null,
      };
    case "APP_DETAILS":
      return {
        ...state,
        appDetails: action.payload,
      };
    case "SET_OTP_VERIFIED":
      return {
        ...state,
        isOtpVerified: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
