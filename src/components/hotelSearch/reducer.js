const hotels = (state = {}, action) => {
    switch (action.type) {
        case "SET_RESULTS": {
            return { ...state, results: action.results };
        }
    }
    return state;
};

export default hotels;
