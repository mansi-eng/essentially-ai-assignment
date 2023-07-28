import styles from "./DataGroup.module.css";

const DataGroup = ({ title, data }) => {
    return (
        <div>
            <span>{title} </span>
            <br />
            <span className={styles["data"]}>{data}</span>
        </div>
    );
};

export default DataGroup;
