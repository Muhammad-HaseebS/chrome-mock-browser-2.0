# Chrome Mock Browser

This project is a simple mock-up of a Chrome-like browser window built using React. It aims to replicate the look and feel of a real Chrome browser, including standard window controls, a top bar with tabs, an address bar, and various icons.

## Features

- **Floating Window**: A centered or fixed window that represents a Chrome browser.
- **Window Controls**: Includes minimize, maximize, and close buttons.
- **Top Bar**: Contains tabs, an address bar, and icons for navigation.
- **Tabs**: At least two tabs that visually switch when clicked.
- **Address Bar**: A rounded input field with placeholder text.
- **Icons**: Back, forward, refresh, lock, star, and vertical menu icons.

## Project Structure

```
chrome-mock-browser
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── BrowserWindow.tsx
│   │   ├── WindowControls.tsx
│   │   ├── TopBar.tsx
│   │   ├── Tabs.tsx
│   │   ├── AddressBar.tsx
│   │   └── Icons.tsx
│   ├── styles
│   │   └── index.css
│   └── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd chrome-mock-browser
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```
This will open the mock browser window in your default web browser.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.