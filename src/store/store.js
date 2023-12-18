import appReducer from "../reducer.js";

const createStore = (reducer) => {
    let state;
    let listeners = [];

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    }

    return { dispatch, getState, subscribe };
};

export const store = createStore(appReducer);
store.dispatch({}); // set initial state as {}
