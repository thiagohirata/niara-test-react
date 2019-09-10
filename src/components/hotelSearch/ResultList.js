import React from "react";
import { hot } from "react-hot-loader";
import Result from "./Result";
const ResultList = props => {
    const { results } = props;
    if (results) {
        return (
            <div className="container-fluid">
                {results.map(result => {
                    const { id: hotelId } = result.hotel;
                    return (
                        <Result
                            key={hotelId}
                            result={result}
                        />
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
};

export default hot(module)(ResultList);
