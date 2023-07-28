import { useState } from "react";
import TickerDetails from "./TickerDetails";
import axios from "axios";

const TickerForm = () => {
    const [ticker, setTicker] = useState("");
    const [date, setDate] = useState("");
    const [tickerData, setTickerData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const body = JSON.stringify({
            ticker,
            date,
        });
        const { data } = await axios.post(
            "http://localhost:5000/api/fetchStockData",
            body,
            { headers: { "Content-Type": "application/json" } }
        );
        setTickerData(data.data);
        setIsLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="ticker-name"
                    id="ticker-name"
                    onChange={(e) => setTicker(e.target.value)}
                />
                <input
                    type="date"
                    name="ticker-date"
                    id="ticker-date"
                    onChange={(e) => setDate(e.target.value)}
                />
                <input type="submit" value="submit" />
            </form>
            {isLoading && <div>Loading....</div>}
            {!isLoading && tickerData && <TickerDetails data={tickerData} />}
        </>
    );
};

export default TickerForm;
