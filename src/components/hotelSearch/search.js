import axios from "axios";

const search = async criteria => {
    const response = await axios.post(
        "https://c446dpfio2.execute-api.sa-east-1.amazonaws.com/dev/hotels/search",
        {
            body: criteria
        }
    );

    return response.data;
};

export default search;
