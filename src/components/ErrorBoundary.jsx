import React from 'react';
import { logError } from '../utils/secureLogger';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorFingerprint: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error securely
        const fingerprint = logError(error, {
            context: 'error-boundary',
            componentStack: errorInfo.componentStack,
            boundary: this.props.boundaryName || 'global',
        });

        this.setState({
            error,
            errorInfo,
            errorFingerprint: fingerprint,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            errorFingerprint: null,
        });

        // If reset callback provided, call it
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI if provided
            if (this.props.fallback) {
                return this.props.fallback({
                    error: this.state.error,
                    errorFingerprint: this.state.errorFingerprint,
                    resetError: this.handleReset,
                });
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                                <svg
                                    className="h-8 w-8 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-montserrat">
                            Something Went Wrong
                        </h2>

                        <p className="text-gray-600 mb-6 font-opensans">
                            We encountered an unexpected error. Our team has been notified and will look into it.
                        </p>

                        {this.state.errorFingerprint && (
                            <p className="text-xs text-gray-400 mb-6 font-mono">
                                Error Reference: {this.state.errorFingerprint}
                            </p>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={this.handleReset}
                                className="w-full bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#B99A2F] transition-colors"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => (window.location.href = '/')}
                                className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Return to Homepage
                            </button>
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            If this problem persists,{' '}
                            <a href="/contact" className="text-[#D4AF37] hover:underline">
                                contact support
                            </a>
                            .
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
