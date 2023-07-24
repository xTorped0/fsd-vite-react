import { PropsWithChildren } from "react";

import backgroundSrc from '@assets/photos/auth.png';

import './styles.scss';

interface Props extends PropsWithChildren {

}

export function AuthBackground(props: Props) {
	const { children } = props;

	return (
		<div className="auth page">
			<img src={backgroundSrc} alt="background" />
			<div className="auth__form">
				{ children }
			</div>
		</div>
	)
}