const { useState } = React;

function Button({ children, variant = 'primary', onClick, disabled = false }) {
    const className = `btn ${variant === 'secondary' ? 'btn-secondary' : ''}`;
    return (
        <button 
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

function Card({ title, children }) {
    return (
        <div className="card">
            {title && <h3 style={{ marginBottom: '16px', color: '#333' }}>{title}</h3>}
            {children}
        </div>
    );
}

function Input({ label, type = 'text', placeholder, value, onChange }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && (
                <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: '#495057'
                }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function Badge({ children, variant = 'default' }) {
    const className = `badge ${variant !== 'default' ? `badge-${variant}` : ''}`;
    return <span className={className}>{children}</span>;
}

function Alert({ type = 'info', children }) {
    return (
        <div className={`alert alert-${type}`}>
            {children}
        </div>
    );
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const [clickCount, setClickCount] = useState(0);

    const handleButtonClick = () => {
        setClickCount(prev => prev + 1);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Pixel Frontend Components</h1>
                <p>Clean HTML, CSS, and React UI Components</p>
            </header>

            <div className="component-grid">
                <Card title="Button Component">
                    <p style={{ marginBottom: '16px', color: '#6c757d' }}>
                        Click count: {clickCount}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Button onClick={handleButtonClick}>
                            Primary Button
                        </Button>
                        <Button variant="secondary" onClick={handleButtonClick}>
                            Secondary
                        </Button>
                        <Button disabled>
                            Disabled
                        </Button>
                    </div>
                </Card>

                <Card title="Input Component">
                    <Input 
                        label="Username"
                        placeholder="Enter your username"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input 
                        label="Email"
                        type="email"
                        placeholder="user@example.com"
                    />
                    <p style={{ color: '#6c757d', fontSize: '14px' }}>
                        Current value: {inputValue || 'Empty'}
                    </p>
                </Card>

                <Card title="Badge Component">
                    <div style={{ marginBottom: '16px' }}>
                        <Badge>Default</Badge>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                    </div>
                    <p style={{ color: '#6c757d', fontSize: '14px' }}>
                        Badges for status indicators and labels
                    </p>
                </Card>

                <Card title="Alert Component">
                    <Alert type="info">
                        This is an informational alert message.
                    </Alert>
                    <Alert type="success">
                        Operation completed successfully!
                    </Alert>
                    <Alert type="warning">
                        Please review your input before proceeding.
                    </Alert>
                </Card>

                <Card title="Card Component">
                    <p style={{ marginBottom: '16px', color: '#6c757d' }}>
                        Cards are used to group related content and actions.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button>Learn More</Button>
                        <Button variant="secondary">Cancel</Button>
                    </div>
                </Card>

                <Card title="Typography">
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Heading 1</h1>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Heading 2</h2>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Heading 3</h3>
                    <p style={{ marginBottom: '12px', color: '#6c757d' }}>
                        Body text with proper line height and spacing for readability.
                    </p>
                    <small style={{ color: '#868e96' }}>Small text for captions and metadata</small>
                </Card>
            </div>

            <footer className="footer">
                <p>Pixel Frontend • AutoDev Studio • Clean, modular UI components</p>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);