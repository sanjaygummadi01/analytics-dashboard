import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/icons/Icon';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const getEmailError = () => { if (!touched.email) return ''; if (!email) return 'Email is required'; if (!validateEmail(email)) return 'Please enter a valid email'; return ''; };
  const getPasswordError = () => { if (!touched.password) return ''; if (!password) return 'Password is required'; if (password.length < 6) return 'Password must be at least 6 characters'; return ''; };
  const isFormValid = () => validateEmail(email) && password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true });
    if (!isFormValid()) return;
    const result = await login(email, password);
    if (result.success) navigate('/dashboard');
    else setError(result.error || 'Login failed');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Icon name="bar-chart" className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">DataViz</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>
          {error && <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(prev => ({ ...prev, email: true }))} placeholder="you@example.com" className={`w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${getEmailError() ? 'border-destructive' : 'border-border'}`} />
              </div>
              {getEmailError() && <p className="mt-2 text-sm text-destructive">{getEmailError()}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => setTouched(prev => ({ ...prev, password: true }))} placeholder="••••••••" className={`w-full pl-12 pr-12 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${getPasswordError() ? 'border-destructive' : 'border-border'}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name={showPassword ? 'eye-off' : 'eye'} className="w-5 h-5" />
                </button>
              </div>
              {getPasswordError() && <p className="mt-2 text-sm text-destructive">{getPasswordError()}</p>}
            </div>
            <button type="submit" disabled={isLoading || !isFormValid()} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? (<><div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />Signing in...</>) : 'Sign In'}
            </button>
          </form>
          <p className="mt-8 text-center text-muted-foreground">Don't have an account?{' '}<Link to="/register" className="text-primary font-medium hover:underline">Create one</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-chart-2/10 to-primary/5 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
            <Icon name="bar-chart" className="w-16 h-16 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Powerful Analytics at Your Fingertips</h2>
          <p className="text-muted-foreground">Upload your data, create stunning visualizations, and gain insights - all from the comfort of your browser.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
