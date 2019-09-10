import React, { Fragment, useReducer } from "react";
import CriteriaForm from "./CriteriaForm";
import ResultList from "./ResultList";
import { hot } from "react-hot-loader";
import reducer from "./reducer";
import _search from "./search";

const HotelSearch = props => {
    const [state, dispatch] = useReducer(reducer, {});

    const search = async criteria => {
        const results = await _search(criteria);
        dispatch({
            type: "SET_RESULTS",
            results
        });
    };
    const { hotels: results } = (state && state.results) || {};

    return (
        <Fragment>
            <CriteriaForm search={search} />
            <ResultList results={results} />
        </Fragment>
    );
};

export default hot(module)(HotelSearch);
