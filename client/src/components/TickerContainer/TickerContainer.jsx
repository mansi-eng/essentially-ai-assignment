import { useState } from "react";
import axios from "axios";

import TickerDetails from "../TickerDetails/TickerDetails";
import styles from "./TickerContainer.module.css";

const TickerContainer = () => {
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
        <div className={styles["container"]}>
            <form onSubmit={handleSubmit} className={styles["form"]}>
                <div className={styles["input-container"]}>
                    <input
                        type="text"
                        name="ticker-name"
                        id="ticker-name"
                        className={styles["input"]}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                    <input
                        type="date"
                        name="ticker-date"
                        id="ticker-date"
                        className={styles["input"]}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className={`${styles["input"]} ${styles["submit-btn"]}`}
                >
                    Submit
                </button>
            </form>
            {hasError && <div>Something went wrong.</div>}
            {isLoading && !hasError && <div>Loading....</div>}
            {!isLoading && tickerData && <TickerDetails data={tickerData} />}
        </div>
    );
};

export default TickerContainer;
