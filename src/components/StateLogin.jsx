import { useState } from 'react';
import Input from './Input';

export default function Login() {
	const [enteredValues, setEnteredInput] = useState({
		email: '',
		password: '',
	});

	const [didEdit, setDidEdit] = useState({
		email: false,
		password: false
	})
	
	const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
	const passwordIsInvalid = didEdit.password && enteredValues.password.trim().length < 6;

	function handleSubmit(event) {
		event.preventDefault();
		console.log('entered values: ' + JSON.stringify(enteredValues));
	}

	function handleInputChange(identifier, value) {
		setEnteredInput((prevValues) => ({
			...prevValues,
			[identifier]: value,
		}));
		setDidEdit((prevEdit) => ({
			...prevEdit,
			[identifier]: false
		}))
	}

	function handleInputBlur(identifier) {
		setDidEdit((prevEdit) => ({
			...prevEdit,
			[identifier]: true
		}));
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			<div className="control-row">
				<Input 
					label="Email"
					id="email"
					type="email"
					name="email"
					onBlur={() => handleInputBlur('email')}
					onChange={(event) =>
						handleInputChange('email', event.target.value)
					}
					value={enteredValues.email}
					error={emailIsInvalid && 'Please enter a valid email address'}
				/>

				<Input 
					label="Password"
					type="password"
					name="password"
					onChange={(event) =>
						handleInputChange('password', event.target.value)
					}
					onBlur={() => handleInputBlur('password')}
					value={enteredValues.password}
					error={passwordIsInvalid && 'Please enter a valid email password'}
				/>				
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button">Login</button>
			</p>
		</form>
	);
}
