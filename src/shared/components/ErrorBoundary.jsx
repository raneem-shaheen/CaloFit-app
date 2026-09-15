import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? <div role="alert">Something went wrong.</div> : this.props.children }
}
