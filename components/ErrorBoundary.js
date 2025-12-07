'use client'

/**
 * Error Boundary Component
 * Catches and handles React errors gracefully
 */

import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    // Store error details in state
    this.state = {
      hasError: true,
      error,
      errorInfo,
    }
    
    // You could also log to an error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-lg text-gray-600">
                We're sorry, but an unexpected error occurred.
              </p>
            </div>

            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <h2 className="text-sm font-medium text-gray-900 mb-2">
                What you can do:
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Try refreshing the page</li>
                <li>Go back to the previous page</li>
                <li>Return to the home page</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-2 bg-forest-600 text-white rounded-md hover:bg-forest-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Go Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Refresh Page
              </button>
            </div>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                  Error Details (Development Only)
                </summary>
                <div className="mt-3 p-4 bg-red-50 rounded-md border border-red-200">
                  <p className="text-sm font-mono text-red-800 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs font-mono text-red-700 overflow-auto max-h-64">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                If this problem continues, please contact the site administrator.
              </p>
            </div>
          </div>
        </div>
      )
    }

    // No error, render children normally
    return this.props.children
  }
}

export default ErrorBoundary
