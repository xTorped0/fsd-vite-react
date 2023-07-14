import styles from './styles.module.scss';

export default function Error(props: { error?: Error | string, children?: Node | string }) {
	const { error, children } = props;
	return (
		<div className={styles.error}>
			{ error && (error.text || error.message || error.code || error) }
			{ !error && children }
		</div>
	);
}
