import { useState } from "react";
import TickerDetails from "./TickerDetails";
import axios from "axios";

const TickerForm = () => {
    const [ticker, setTicker] = useState("");
    const [date, setDate] = useState("");
    const [tickerData, setTickerData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setHasError(false);
        const body = JSON.stringify({
            ticker,
            date,
        });
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/fetchStockData",
                body,
                { headers: { "Content-Type": "application/json" } }
            );
            setTickerData(data.data);
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
        }
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
            {hasError && <div>Something went wrong.</div>}
            {isLoading && !hasError && <div>Loading....</div>}
            {!isLoading && tickerData && <TickerDetails data={tickerData} />}
        </>
    );
};

export default TickerForm;
