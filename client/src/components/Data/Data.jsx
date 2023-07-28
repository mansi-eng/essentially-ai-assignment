import styles from "./Data.module.css";

const Data = ({ title, data }) => {
    return (
        <div className={styles["data"]}>
            <span>{title} </span>
            <br />
            <span className={styles["value"]}>{data}</span>
        </div>
    );
};

export default Data;
