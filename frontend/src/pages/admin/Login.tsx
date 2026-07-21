import { type FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/Field";
import logo from "../../assets/images/logo.png";

export function Login() {
  const { auth, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (auth) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin";
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch {
      setError("Sai tên đăng nhập hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-6 dark:bg-ink-950">
      <div className="w-full max-w-sm border border-ink-900 bg-white p-8 dark:border-ink-100 dark:bg-ink-900">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="A* SQUAD" className="h-14 w-14" />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-ink-900 dark:text-white">
            Đăng nhập
          </h1>
          <p className="mt-1 text-sm text-ink-400">Dành cho quản trị viên, điều hành viên và thành viên</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Tên đăng nhập"
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading} icon={<LogIn size={16} />}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
}
