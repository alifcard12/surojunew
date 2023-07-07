export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  mempelaiPria: "",
  namaPanggilanPria: "",
  ayahPria: "",
  ibuPria: "",
  mempelaiWanita: "",
  namaPanggilanWanita: "",
  ayahWanita: "",
  ibuWanita: "",
  posisiMempelai: "",
  fotopria: "",
  fotowanita: "",
};

export const mempelaiReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SET_FOTO_PRIA":
      return {
        ...state,
        fotopria: action.payload,
      };
    case "SET_FOTO_WANITA":
      return {
        ...state,
        fotowanita: action.payload,
      };
    default:
      return state;
  }
};
