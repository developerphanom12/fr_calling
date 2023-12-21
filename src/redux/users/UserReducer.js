const initialState = {
  user: {},
  userCheck: false,
  role: "",
  appDetails: {},


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
    case "APP_DETAILS":
      return {
        ...state,
        appDetails: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
