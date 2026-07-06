# CodeScan AI

AI-powered code analyzer that finds bugs, security issues, and suggests improvements instantly.

## What is CodeScan AI?

CodeScan AI helps you write better code by analyzing your code instantly and finding:
- **Bugs** - Runtime and logic errors
- **Security Issues** - Vulnerabilities in your code
- **Performance Tips** - Ways to make your code faster
- **Complexity Analysis** - Time and space complexity info

## Features

✅ **Supports 10+ Languages** - JavaScript, Python, Java, C++, Go, Rust, and more

✅ **AI-Powered Analysis** - Uses Google Gemini AI for accurate results

✅ **Instant Fixes** - Get corrected code automatically

✅ **Line-by-line Bugs** - See exactly where problems are

✅ **Free to Use** - No cost, no limits

## Getting Started

### Requirements
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Setup Environment Variables

Create `.env.local` file in the root:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Use

1. **Sign up** with email or Google
2. **Select Language** - Choose your programming language
3. **Paste Code** - Add the code you want to analyze
4. **Click Analyze** - Get instant bug report
5. **Fix Code** - Get corrected code with all bugs fixed

## Technologies Used

- **Frontend** - React, Vite, Tailwind CSS
- **Backend** - Firebase Authentication
- **AI** - Google Gemini API
- **Editor** - Monaco Editor

## License

Open source - Feel free to use and modify
