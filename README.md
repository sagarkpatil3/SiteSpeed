Here's the updated README file for your Sitespeed extension using npm:

````markdown
# Sitespeed - React Chrome Extension

## Description

Sitespeed is a Chrome extension built with React that helps users measure and improve the performance of their websites. This extension leverages Chrome's developer tools to analyze various metrics and provides insights to optimize web performance.

## Features

- Measure page load times and other performance metrics.
- Provides detailed insights into website performance.
- Uses Chrome DevTools to analyze and report on website speed.
- Background script to handle messages and storage using `webextension-polyfill`.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/sagarkpatil3/sitespeed-extension.git
   ```
````

2. Navigate to the project directory:

   ```bash
   cd sitespeed-extension
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Load the extension in Chrome:

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle switch in the top right)
   - Click "Load unpacked" and select the `build` directory of your project

## Usage

1. Click on the Sitespeed extension icon in the Chrome toolbar.
2. Enter the URL of the website you want to analyze.
3. Click "Analyze" to view performance metrics and insights.

## Development

### File Structure

- `src`: Contains the source code of the React app.
  - `components`: Reusable UI components.
  - `helpers`: Helper functions and utilities.
  - `background`: Background script for handling messages and storage.
  - `content`: Content scripts for interacting with web pages.
  - `popup`: React components for the extension's popup UI.

### Available Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the code for any style issues.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Chrome Extensions API](https://developer.chrome.com/docs/extensions/mv3/)
- [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)

```

This README provides a comprehensive overview of your Sitespeed extension, covering installation, usage, development, and contribution guidelines, with instructions tailored for npm.
```
