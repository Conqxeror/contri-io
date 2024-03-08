# AI-Powered Code Assistant - Contri.io

This project provides an AI-powered assistant to help developers with code changes, issue fixing, and custom modifications. It utilizes generative AI to analyze code, understand user requests, and suggest potential solutions.

## Backend: 
[https://github.com/Conqxeror/contri-api](https://github.com/Conqxeror/contri-api)

## Frontend: 
[https://github.com/Conqxeror/contri-io](https://github.com/Conqxeror/contri-io)

# Features

* Fix Issues:  Identify and address issues within a provided codebase. 
* Make Code Changes:  Incorporate user-specified modifications to existing code.
* Generative AI Assistance: Leverage Google's Generative AI to understand code context and propose solutions.
* GitHub Integration:  Seamlessly work with code hosted on GitHub repositories.
* Markdown & PDF Generation:  Generate well-formatted reports of the codebase, issues, and suggested solutions.

# How it Works

1.  Provide Code:  Specify a GitHub repository URL or upload your code locally. (Local functionality not currently implemented)
2.  Describe Issue/Changes: Detail the issue you want to fix or the modifications you desire.
3.  AI Analysis & Response:  The AI assistant analyzes the code and user input, then suggests potential solutions.

# Installation

1.  Prerequisites: Node.js and npm (or yarn) are required.
2.  Clone Repository:  
```bash
git clone https://github.com/Conqxeror/contri-io.git
```
3.  Install Dependencies:  
```bash
cd contri-io
npm install
```
4.  Create a `.env` File:  Create a `.env` file in the project root directory and add the following lines, replacing the placeholders with your actual values:

```
API_KEY=YOUR_GOOGLE_API_KEY
PORT=3001  # You can adjust the port number if needed
```

5.  Start the Server:  
```bash
npm start
```

# Usage

1.  API Endpoints:  The project provides two main functionalities through API endpoints:
    - `/generate-files`: This endpoint takes a GitHub repository URL as input and generates an MDX file with the code, a PDF file containing the code content, and a JSON file listing relevant issues from the repository.
    - `/fix-issue`: This endpoint allows you to specify a GitHub repository URL, custom changes (optional), and an issue number (optional). It then utilizes the AI model to analyze the code and suggest solutions based on the provided information.
2.  Client-Side Example:  The `ChatScreen` component included in the `client-side` folder demonstrates a basic example of interacting with the `/fix-issue` endpoint. You can integrate this component or develop your own front-end application to interact with the API.

# Contributing

We welcome contributions to this project! Please see the CONTRIBUTING.md file for guidelines on how to contribute.

# License

This project is licensed under the MIT License. See the LICENSE file for details.
