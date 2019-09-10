import React from "react";
import { hot } from "react-hot-loader";

const Result = props => {
    const { result } = props;
    const hotel = result.hotel;
    const roomRates = result.roomRates;
    const firstRoomRate = roomRates && roomRates[0];
    const totalPrice =
        firstRoomRate &&
        firstRoomRate.priceComposition &&
        firstRoomRate &&
        firstRoomRate.priceComposition.total;

    return (
        <div className="hotel-result">
            <h2>{hotel && hotel.name}</h2>
            {hotel &&
                hotel.extra &&
                hotel.extra.thumbnail && (
                    <div className="thumbnail">
                        {hotel.extra.thumbnail}
                    </div>
                )}
            <div className="address">
                {hotel && hotel.address}
            </div>

            {totalPrice && (
                <div className="price">
                    {totalPrice.currency} {totalPrice.value}
                </div>
            )}
        </div>
    );
};

export default hot(module)(Result);
