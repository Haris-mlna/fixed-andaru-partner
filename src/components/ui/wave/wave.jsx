import styles from "./wave.module.css";

const WaveSVG = () => {
	return (
		<div className={styles.ocean}>
			<div className={styles.wave}></div>
			<div className={styles.wave}></div>
			<div className={styles.wave}></div>
			<div className={styles.wave}></div>
		</div>
	);
};

export default WaveSVG;
