const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5550/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Advanced Todo</h1>
        <p className="text-slate-500 mb-6">
          Sign in to manage your tasks
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;