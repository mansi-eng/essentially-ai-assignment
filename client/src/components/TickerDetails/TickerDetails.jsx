import Data from "../Data/Data";
import styles from "./TickerDetails.module.css";

const TickerDetails = ({ data }) => {
    const { open, close, high, low, volume } = data;

    return (
        <div className={styles["container"]}>
            <h2 className={styles["heading"]}>Ticker Details</h2>
            <div className={styles["data-container"]}>
                <Data title={"Open"} data={open} />
                <Data title={"Close"} data={close} />
                <Data title={"High"} data={high} />
                <Data title={"Low"} data={low} />
                <Data title={"Volume"} data={volume} />
            </div>
        </div>
    );
};

export default TickerDetails;
