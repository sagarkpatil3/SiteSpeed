import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { runtime, tabs } from 'webextension-polyfill';

const APIKEY = 'AIzaSyC5NtFwVhyuO3hRoxYtCaWbIj3_2C0WIlg';

function App() {
  const [url, setUrl] = useState<string>('');;
  const [loadTime, setLoadTime] = useState('2.35s');
  const [recentChecks, setRecentChecks] = useState<string[]>([]);

  const handleCheckPerformance = async () => {
    if (!url) return;

    try {
      const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      console.log('data', data)
      const loadTime = data.lighthouseResult.audits['speed-index'].displayValue;
      setLoadTime(loadTime);
      setRecentChecks([...recentChecks, url]);  
    } catch (error) {
      // setError('Failed to fetch performance data');
    } finally {
      // setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setLoadTime('2.35s');
    // setRecentChecks([]);
  };

  const handleImportUrlFromTab = async() =>{
    // const response = await runtime.sendMessage({from:'content', to: 'background', action: 'get-url' });
    
    // if (response && response.url) {
    //   console.log('Current tab URL:', response.url);
    //   setUrl(response.url);
    // }

    const [tab] = await tabs.query({ active: true, currentWindow: true });
    if(tab && tab.url){
      console.log('Current tab URL:', tab.url);
        setUrl(tab.url);
        // return tab.url;
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Site Speed Checker</h1>
        {/* Replace with actual icon component */}
        <i className="settings-icon"></i>
      </header>
      <section className="input-section">
        <input type="text" placeholder="Enter the URL to check" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleCheckPerformance}>Check Performance</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleImportUrlFromTab}>Import from Current Tab</button>

      </section>
      <section className="performance-metrics">
        <h2>Performance Metrics</h2>
        <div className="metric">
          <i className="clock-icon"></i>
          <span>Load Time: {loadTime} </span>
        </div>
      </section>
      <section className="recent-checks">
        <h2>Recent Checks</h2>
        <ul>
          {recentChecks.map((check, index) => (
            <li key={index}>{check}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
