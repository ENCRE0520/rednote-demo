export const initialPostNavigation = {
  topic: null,
  flight: null,
  postStack: [],
  topicFromPost: false,
}

export function postNavigationReducer(state, action) {
  switch (action.type) {
    case 'open-topic':
      return { ...state, topic: action.topic, topicFromPost: false }
    case 'open-community':
      if (!action.topic || state.flight?.phase !== 'open') return state
      return { ...state, topic: action.topic, topicFromPost: true }
    case 'open-post': {
      const postStack = action.preservePost && state.flight ? [...state.postStack, state.flight] : state.postStack
      return {
        ...state,
        flight: action.flight,
        postStack,
      }
    }
    case 'update-flight':
      return { ...state, flight: action.update(state.flight) }
    case 'close-flight':
      return { ...state, flight: null }
    case 'close-topic': {
      const restore = state.topicFromPost && !state.flight && state.postStack.length
        ? state.postStack[state.postStack.length - 1]
        : state.flight
      return {
        ...state,
        topic: null,
        flight: restore,
        postStack: restore === state.flight ? state.postStack : state.postStack.slice(0, -1),
        topicFromPost: false,
      }
    }
    default:
      return state
  }
}
