import { AuthBackground } from "@entities/auth/background-form";
import { AuthForm } from "@features/auth-form";

export function Auth() {
	return (
		<AuthBackground>
			<AuthForm />
		</AuthBackground>
	)
}