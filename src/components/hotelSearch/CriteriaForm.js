import React, { useState } from "react";
import { hot } from "react-hot-loader";
import InputDate from "@/components/controls/InputDate";

const CriteriaForm = props => {
    const { search } = props;
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const onSubmit = e => {
        e.preventDefault();
        search({
            startDate,
            endDate
        });
    };
    return (
        <div className="mb-3 py-3 bg-white shadow-sm">
            <form onSubmit={onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Destino</label>
                                <input
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="col-6 col-md-3">
                            <div className="form-group">
                                <label>
                                    Data de entrada
                                </label>
                                <InputDate
                                    value={startDate}
                                    onValue={setStartDate}
                                />
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-group">
                                <label>
                                    Data de entrada
                                </label>
                                <InputDate
                                    value={endDate}
                                    onValue={setEndDate}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-right mt-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Pesquisar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default hot(module)(CriteriaForm);
