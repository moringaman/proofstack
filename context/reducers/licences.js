export function licences(state, action) {
    switch (action.type) {
      case "ADDING_LICENCE":
        return { ...state, licences: { adding: true} };
        case "ADDED_LICENCE":
        return { ...state, licences: { adding: false} };
      default:
        return state;
    }
  }