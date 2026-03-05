import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/icons/Icon';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmPassword: false });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const getNameError = () => { if (!touched.name) return ''; if (!name.trim()) return 'Name is required'; if (name.trim().length < 2) return 'Name must be at least 2 characters'; return ''; };
  const getEmailError = () => { if (!touched.email) return ''; if (!email) return 'Email is required'; if (!validateEmail(email)) return 'Please enter a valid email'; return ''; };
  const getPasswordError = () => { if (!touched.password) return ''; if (!password) return 'Password is required'; if (password.length < 6) return 'Password must be at least 6 characters'; return ''; };
  const getConfirmPasswordError = () => { if (!touched.confirmPassword) return ''; if (!confirmPassword) return 'Please confirm your password'; if (password !== confirmPassword) return 'Passwords do not match'; return ''; };

  const passwordRequirements = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Contains a letter', met: /[a-zA-Z]/.test(password) },
    { label: 'Contains a number', met: /\d/.test(password) },
  ];

  const isFormValid = () => name.trim().length >= 2 && validateEmail(email) && password.length >= 6 && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (!isFormValid()) return;
    const result = await register(email, password, name.trim());
    if (result.success) navigate('/dashboard');
    else setError(result.error || 'Registration failed');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-chart-2/10 via-primary/10 to-chart-2/5 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-chart-2 to-primary flex items-center justify-center">
            <Icon name="bar-chart" className="w-16 h-16 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Join Thousands of Analysts</h2>
          <p className="text-muted-foreground">Create beautiful dashboards, upload your data, and export insights for Power BI - completely free.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Icon name="bar-chart" className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">DataViz</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Get started with your free analytics dashboard</p>
          {error && <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <Icon name="user" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched(prev => ({ ...prev, name: true }))} placeholder="John Doe" className={`w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${getNameError() ? 'border-destructive' : 'border-border'}`} />
              </div>
              {getNameError() && <p className="mt-2 text-sm text-destructive">{getNameError()}</p>}
            </div>
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
              {password && (
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                        {req.met && <Icon name="check" className="w-3 h-3" />}
                      </div>
                      <span className={req.met ? 'text-success' : 'text-muted-foreground'}>{req.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))} placeholder="••••••••" className={`w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${getConfirmPasswordError() ? 'border-destructive' : 'border-border'}`} />
              </div>
              {getConfirmPasswordError() && <p className="mt-2 text-sm text-destructive">{getConfirmPasswordError()}</p>}
            </div>
            <button type="submit" disabled={isLoading || !isFormValid()} className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? (<><div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />Creating account...</>) : 'Create Account'}
            </button>
          </form>
          <p className="mt-8 text-center text-muted-foreground">Already have an account?{' '}<Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
