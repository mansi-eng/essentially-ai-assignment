import { useState } from "react";
import axios from "axios";

import TickerDetails from "../TickerDetails/TickerDetails";
import styles from "./TickerContainer.module.css";

const TickerContainer = () => {
    const [ticker, setTicker] = useState("");
    const [date, setDate] = useState("");
    const [tickerData, setTickerData] = useState();

    // State to handle loading
    const [isLoading, setIsLoading] = useState(false);

    // States to handle error
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setHasError(false);

        const body = JSON.stringify({
            ticker,
            date,
        });

        // Fetch data from our backend server
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/fetchStockData",
                body,
                { headers: { "Content-Type": "application/json" } }
            );
            setTickerData(data.data);
            setErrorMsg("");
            setHasError(false);
        } catch (err) {
            console.log(err.response.data);
            setHasError(true);
            setErrorMsg(err.response.data.error.message);
            setTickerData();
        }
        setIsLoading(false);
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
                    disabled={!ticker || !date || isLoading}
                >
                    Submit
                </button>
            </form>
            <dir className={styles["details"]}>
                {hasError && <div className={styles["error"]}>{errorMsg}</div>}
                {isLoading && !hasError && (
                    <div className={styles["loading"]}>Loading....</div>
                )}
                {!isLoading && tickerData && (
                    <TickerDetails data={tickerData} />
                )}
            </dir>
        </div>
    );
};

export default TickerContainer;
