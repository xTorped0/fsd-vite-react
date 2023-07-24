import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@shared/hooks/useState';
import Error from '@shared/components/error/Error';

import { Form } from '@ui/form';
import { Input } from '@ui/field';
import { Button } from '@ui/button';

import { logIn } from '../store/authSlice';
import { useLoginMutation } from '../api/authSlice';

import styles from './styles.module.scss';

export function LoginForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [login, { isLoading, isError, error }] = useLoginMutation();

	const onFinish = async (values: Record<string, string>) => {
		try {
			const userData = await login(values).unwrap();
			dispatch(logIn(userData));
			navigate('/');
		} catch(err) {
			console.error(err);
		}
	};
	
	return (
		<Form
			name="login"
			labelCol={{ span: '1em' }}
			className={styles.form}
			onFinish={onFinish}
			initialValues={{ remember: true }}
		>

			<Form.Item
				label="Логін"
				name="login"
				style={{ maxWidth: '30em' }}
				rules={[{ required: true, message: "Введіть ім\'я користувача!" }]}
			>
				<Input placeholder="Введіть ім'я користувача" />
			</Form.Item>

			<Form.Item
				label="Пароль"
				name="password"
				style={{ maxWidth: '30em' }}
				rules={[{ required: true, message: 'Введіть пароль!' }]}
			>
				<Input.Password placeholder="Введіть пароль" />
			</Form.Item>

			{ isError ? <Error error={error.error} /> : false }

			<Form.Item style={{ width: 'fit-content', margin: 'auto' }}>
				<Button type="primary" htmlType="submit" loading={isLoading} className={styles.button}>
					Вхід
				</Button>
   		</Form.Item>
		</Form>
	) 
}