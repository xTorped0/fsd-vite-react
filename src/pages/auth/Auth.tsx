import { AuthBackground } from "@entities/auth";
import { LoginForm } from "@features/auth/login-form/Form";

export function Auth() {
	return (
		<AuthBackground>
			<LoginForm />
		</AuthBackground>
	)
}