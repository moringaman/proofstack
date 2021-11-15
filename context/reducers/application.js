export function licences(state, action) {
    switch (action.type) {
      case "ADDING_APPLICATION":
        return { ...state, applications: { adding: true} };
        case "ADDED_APPLICATION":
        return { ...state, applications: { adding: false} };
      default:
        return state;
    }
  }