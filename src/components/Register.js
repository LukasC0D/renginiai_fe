import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";

const Register = () => {
	const url = `http://localhost:8000/api/register`;
	const hs = { Accept: "application/json", "Content-Type": "application/json" };
	const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", password_confirmation: "" });
	const [err, setErr] = useState(null);
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const register = (e) => {
		e.preventDefault();
		fetch(url, { method: "POST", headers: hs, body: JSON.stringify(userInfo) })
			.then(
				(res) => {
					if (res.status === 200) return res.json();
					else if (res.status === 422) setErr({ message: res.statusText });
				},
				(err) => console.log(err)
			)
			.then((res) => {
				auth.login(res.user, auth.token);
				navigate("/home");
			});
	};
	return (
		<div className="d-flex aligns-items-center justify-content-center mt-5">
			<div className="card w-50" style={{background:"rgba(43, 35, 35, 0.5)", color:'white'}}>
				<div className="card-header">Registruotis</div>
				<div className="card-body">
					<div className="text-danger">{err?.message}</div>
					<form onSubmit={(e) => register(e)}>
						<div className="my-2 text-danger"></div>
						<div className="form-group d-grid gap-2">
							<label className="form-label mb-0">Vardas</label>
							<input
								className="form-control"
								type="text"
								name="name"
								onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
							/>
							<label className="form-label mt-2 mb-0">Email</label>
							<input
								className="form-control"
								type="email"
								name="email"
								onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
							/>
							<label className="form-label mt-2 mb-0">Slaptažodis</label>
							<input
								className="form-control"
								type="password"
								name="password"
								onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
							/>
							<label className="form-label mt-2 mb-0">Patvirtinkite slaptažodį</label>
							<input
								className="form-control"
								type="password"
								name="password_confirmation"
								onChange={(e) => setUserInfo({ ...userInfo, password_confirmation: e.target.value })}
							/>
							<input className="btn btn-primary mt-4" type="submit" value="Submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
};

export default Register;