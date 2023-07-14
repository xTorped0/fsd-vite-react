import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ConfigProvider as ANTdConfigProvider } from 'antd';
import ANTdLOCALE from 'antd/lib/locale/uk_UA';

import '/config';
import store from './store';

import { App } from "./App";

import './styles/index.scss';

const rootElem = document.getElementById('RootAppContainer')!;
const root = ReactDOM.createRoot(rootElem);

const theme = {
	token: {
		colorPrimary: '#5C843E',
		// colorPrimaryBg: '#5C843E',
		// colorInfo: '#5C843E',
		colorLink: '#5C843E',
		fontFamily: 'Open Sans',
		borderRadius: 4,
	},
}

root.render(
	<Provider store={store}>
		<ANTdConfigProvider locale={ANTdLOCALE} theme={theme}>
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={<App />} />
			</Routes>
		</BrowserRouter>
		</ANTdConfigProvider>
	</Provider>
)