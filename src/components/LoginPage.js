import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const details = {
            email,
            password,
        };
        console.table(details);
    };

    return (
        <div>
            <div>
                <h1>Healthy Habits for a better Life</h1>
                <h3>
                    Get diet and fitness recommendations to help on your healthy
                    lifestyle journey{" "}
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        email
                        <input
                            type={"email"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type={"password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>
                    <button type="submit"> Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
