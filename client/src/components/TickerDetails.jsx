import styles from "./TickerDetails.module.css";

const TickerDetails = ({ data }) => {
  console.log({ data });
  const { open, close, high, low, volume } = data;
  return (
    <div>
      <h1>Ticker Details</h1>
      <span className={styles.text}>Open : {open}</span>
      <span>close : {close}</span>
      <span>high : {high}</span>
      <span>low : {low}</span>
      <span>volume : {volume}</span>
    </div>
  );
};

export default TickerDetails;
