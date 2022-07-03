export const initialState = {
    activePage: "dashboard"
  };
  
const Reducer = (state, action) => {
    switch (action.type) {
      case "SET_ACTIVE_PAGE":
        return {
          state: action?.payload?.activePage
        };
  
      default:
        return state;
    }
  };
  
  export default Reducer;