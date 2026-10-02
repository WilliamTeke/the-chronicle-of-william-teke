import { Component, type ReactNode } from 'react';

/** Isolate optional interactive features so the rest of the portfolio stays usable. */
export default class FeatureBoundary extends Component<{ children: ReactNode; name: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <div className="feature-fallback" role="status">
      <p>{this.props.name} couldn’t load.</p>
      <p>You can still explore the rest of the site.</p>
      <button type="button" onClick={() => window.location.reload()}>Reload page</button>
    </div>;
    return this.props.children;
  }
}
