import { useAppSelector } from "@shared/hooks/useState";
import { useLocation, Outlet, Navigate } from "react-router-dom";


export function RequireAuth() {
	const { token } = useAppSelector(store => store.auth);
	const location = useLocation();

	return (
		token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
	)
}