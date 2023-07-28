import DataGroup from "../DataGroup/DataGroup";
import styles from "./TickerDetails.module.css";

const TickerDetails = ({ data }) => {
    const { open, close, high, low, volume } = data;

    return (
        <div className={styles["container"]}>
            <h2 className={styles["heading"]}>Ticker Details</h2>
            <div className={styles["group-container"]}>
                <DataGroup title={"Open"} data={open} />
                <DataGroup title={"Close"} data={close} />
                <DataGroup title={"High"} data={high} />
                <DataGroup title={"Low"} data={low} />
                <DataGroup title={"Volume"} data={volume} />
            </div>
        </div>
    );
};

export default TickerDetails;
