import Link from 'next/link';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <Login />
      <Link href="./conversations">
        <h1>Go to Conversh1tion Page</h1>
      </Link>
    </div>
  );
};

export default LoginPage;
