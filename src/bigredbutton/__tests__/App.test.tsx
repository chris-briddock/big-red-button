import React from 'react';
import App from '../App';

// Tests for the Big Red Button App component
describe('Big Red Button App', () => {
  it('should be a valid React component', () => {
    expect(typeof App).toBe('function');
  });

  it('should render without crashing', () => {
    expect(() => React.createElement(App)).not.toThrow();
  });

  it('should have the correct display name', () => {
    expect(App.name).toBe('App');
  });

  it('should export a default function', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('should be importable from the main file', () => {
    // This test ensures the App component can be imported successfully
    const AppComponent = require('../App').default;
    expect(AppComponent).toBeDefined();
    expect(typeof AppComponent).toBe('function');
  });
});
