const checkInReducer = (state = true, action) => {
  switch (action.type) {
    case "CHECK_IN_VALID":
      return true;
    case "CHECK_IN_NOT_VALID":
      return false;
    default:
      return state;
  }
};
export default checkInReducer;
