import styles from "../styles/ErrorModal.module.css";

const ErrorModal = (props) => {
  console.log(props.isVisible);
  if (props.isVisible === true)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorWrapper}>
          <h1 className={styles.header}>ERROR</h1>
          <p style={{ textAlign: "center" }} className={styles.paragraph}>
            Value must be a whole number, that is greater than 0.
          </p>
          <button className={styles.errorBtn} onClick={props.handleClose}>
            X
          </button>
        </div>
      </div>
    );
};

export default ErrorModal;
