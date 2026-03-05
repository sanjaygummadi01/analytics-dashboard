import { Link } from 'react-router-dom';
import { Icon } from '@/components/icons/Icon';

const Landing = () => {
  const features = [
    { icon: 'upload', title: 'Easy Data Upload', description: 'Upload CSV files and instantly visualize your data with our intuitive interface.' },
    { icon: 'line-chart', title: 'Custom Charts', description: 'Beautiful line, bar, and growth charts built without any external libraries.' },
    { icon: 'trending-up', title: 'Real-time Metrics', description: 'Track sales, revenue, users, and growth with dynamic metric cards.' },
    { icon: 'download', title: 'Export Ready', description: 'Export your data in CSV, JSON, or Power BI-ready formats.' },
  ];

  const stats = [
    { value: '100%', label: 'Frontend' },
    { value: '0', label: 'Dependencies' },
    { value: 'SVG', label: 'Charts' },
    { value: 'JS', label: 'JavaScript' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Icon name="bar-chart" className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DataViz</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8">
              <Icon name="zap" className="w-4 h-4" />
              100% Frontend Analytics Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Visualize Your Data
              <span className="block bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Without Limits</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A powerful analytics dashboard built entirely with React and JavaScript. Upload data, create stunning visualizations, and export for Power BI — all in your browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2">
                Start Analyzing <Icon name="arrow-right" className="w-5 h-5" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 text-lg font-medium border border-border bg-card text-foreground rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2">Sign In</Link>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-4 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Sales Trend</h3>
                  <Icon name="line-chart" className="w-5 h-5 text-primary" />
                </div>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary to-chart-2 rounded-t-sm opacity-80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Total Revenue', value: '$125.4K', change: '+12.5%' },
                  { label: 'Active Users', value: '2,847', change: '+8.2%' },
                  { label: 'Growth Rate', value: '23.5%', change: '+5.1%' },
                ].map((metric, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border">
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                    <div className="flex items-end justify-between mt-1">
                      <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                      <span className="text-sm text-success font-medium">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Built with modern web technologies, no external chart libraries required.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="glass-card rounded-xl p-6 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={feature.icon} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Built for Modern Analytics</h2>
              <p className="text-lg text-muted-foreground mb-8">Our dashboard combines beautiful design with powerful functionality, all running entirely in your browser with zero backend requirements.</p>
              <div className="space-y-4">
                {[
                  { icon: 'shield', text: 'Your data stays in your browser - complete privacy' },
                  { icon: 'zap', text: 'Lightning fast with no server round-trips' },
                  { icon: 'globe', text: 'Works offline once loaded' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <Icon name={item.icon} className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'bar-chart', label: 'Bar Charts' },
                { icon: 'line-chart', label: 'Line Charts' },
                { icon: 'pie-chart', label: 'Analytics' },
                { icon: 'trending-up', label: 'Trends' },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                    <Icon name={item.icon} className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Create your account and start visualizing your data in minutes.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25">
            Create Free Account <Icon name="arrow-right" className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Icon name="bar-chart" className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">DataViz</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 DataViz Dashboard. Built with React & JavaScript.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
