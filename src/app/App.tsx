import { Routes, Route } from 'react-router-dom';

import Layout from '@shared/components/Layout';
import { RequireAuth } from '@shared/components/RequireAuth';

import { Auth } from '@pages/auth';
import { Home } from '@pages/home';

export function App() {
	return (
		<Routes>
			<Route path ='/' element={<Layout />}>
				{/* public routes */}
				{/* <Route index element={<Auth />} /> */}
				<Route path ='/login' element={<Auth />} />

				{/* protected routes */}
				<Route element={<RequireAuth />}>
					<Route index element={<Home />} />
				</Route>
			</Route>
		</Routes>
	)
}