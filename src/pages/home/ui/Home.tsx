import { useAppSelector } from "@shared/hooks/useState"

export function Home() {
	const { user } = useAppSelector(store => store.auth);

	return (
		<div> 
			{ `${user?.name} ${user?.surname}` }
		</div>
	)
}