import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { runtime, tabs } from 'webextension-polyfill';
import { ThreeCircles } from 'react-loader-spinner';


function App() {
  const [url, setUrl] = useState('');
  const [loadTime, setLoadTime] = useState(0);
  const [firstContentfulPaintMs, setFirstContentfulPaintMs] = useState(0);
  const [largestContentfulPaintMs, setLargestContentfulPaintMs] = useState(0);
  const [firstInputDelayMs, setFirstInputDelayMs] = useState(0);
  const [recentChecks, setRecentChecks] = useState<string[]>([]);
  const [showDetailedMetrics, setShowDetailedMetrics] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [apiKey, setApiKey] = useState<string | undefined>('');

  useEffect(() => {
    try {
      const key = process.env.REACT_APP_API_KEY
      setApiKey(key);
    } catch (error) {
      setError('Error accessing API key from manifest');
      console.error(error);
    }
  }, []);

  const handleCheckPerformance = async () => {
    if (!url) return;
    setIsLoading(true);
    setError('');
    console.log("apiKey", apiKey)
    try {
      const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`);
      const data = await response.json();
      console.log('data', data);

      const loadTime = data.lighthouseResult.audits['speed-index'].displayValue;
      setLoadTime(loadTime);
      const firstContentfulPaintMs = data.lighthouseResult.audits['first-contentful-paint'].numericValue;
      setFirstContentfulPaintMs(firstContentfulPaintMs);
      const largestContentfulPaintMs = data.lighthouseResult.audits['largest-contentful-paint'].numericValue;
      setLargestContentfulPaintMs(largestContentfulPaintMs);
      const firstInputDelayMs = data.lighthouseResult.audits['max-potential-fid'].numericValue;
      setFirstInputDelayMs(firstInputDelayMs);
      setRecentChecks([...recentChecks, url]);
    } catch (error) {
      setError('Failed to fetch performance data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setLoadTime(0);
    setFirstContentfulPaintMs(0);
    setLargestContentfulPaintMs(0);
    setFirstInputDelayMs(0);
    setError('');
  };

  const handleImportUrlFromTab = async () => {
    const [tab] = await tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      console.log('Current tab URL:', tab.url);
      setUrl(tab.url);
    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="App">
      <header>
        <h1>Site Speed Checker</h1>
      </header>
      <section className="input-section">
        <input
          type="text"
          placeholder="Enter the URL to check"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleCheckPerformance} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Check Performance'}
        </button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleImportUrlFromTab}>Import from Current Tab</button>
        {error && <p className="error-message">{error}</p>}
      </section>
      {isLoading ? (
        <div className="loader">
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : <section className="performance-metrics">
      <h2>Performance Metrics</h2>
      <div className="metric">
        <i className="clock-icon"></i>
        <span>Load Time: {loadTime}ms</span>
      </div>
      <div className="metric">
        <i className="eye-icon"></i>
        <span>First Contentful Paint: {firstContentfulPaintMs}ms</span>
      </div>
      <div className="metric">
        <i className="chart-icon"></i>
        <span>Largest Contentful Paint: {largestContentfulPaintMs}ms</span>
      </div>
      <div className="metric">
        <i className="eye-delay-icon"></i>
        <span>First Input Delay: {firstInputDelayMs}ms</span>
      </div>
    </section>}
    {/* next version */}
      {/* <section className="recent-checks">
        <h2>Recent Checks</h2>
        <ul>
          {recentChecks.map((check, index) => (
            <li key={index}>{check}</li>
          ))}
        </ul>
      </section> */}
    </div>
  );
}

export default App;
