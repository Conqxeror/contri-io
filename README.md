# AI-Powered Code Assistant for Github Issues - Contri.io ![Screenshot 2024-03-09 194250](https://github.com/Conqxeror/contri-io/assets/110852661/b68f2af5-3095-4c9f-8214-f78c1668c7ad)


This project provides an AI-powered assistant to help developers with code changes, issue fixing, and custom modifications in Github Repositories. It utilizes generative AI to analyze code, understand user requests, and suggest potential solutions.

![Screenshot 2024-03-10 014739](https://github.com/Conqxeror/contri-io/assets/110852661/dfaeed11-9b2f-40e6-8a9b-36affff2e356)

# Features

* Fix Issues:  Identify and address issues within a provided codebase. 
* Make Code Changes:  Incorporate user-specified modifications to existing code.
* Generative AI Assistance: Leverage Google's Generative AI to understand code context and propose solutions.
* GitHub Integration:  Seamlessly work with code hosted on GitHub repositories.
* Markdown & PDF Generation:  Generate well-formatted reports of the codebase, issues, and suggested solutions.

## Future Improvemets:
- Raise issue if you think there should be.

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
YOUR_API_KEY=YOUR_GOOGLE_AI_API_KEY
GITHUB_TOKEN=YOUR_GITHUB_ACCESS_TOKEN 
```

5.  Start the Server:  
```bash
npm start
```

# Usage

1.  API Endpoints:  The project provides two main functionalities through API endpoints:
    - `/fix-issue`: This endpoint allows you to specify a GitHub repository URL, custom changes (optional), and an issue number (optional). It then utilizes the AI model to analyze the code and suggest solutions based on the provided information.

2.  Client-Side Example:  The `ChatScreen` component included in the `client-side` folder demonstrates a basic example of interacting with the `/fix-issue` endpoint. You can integrate this component or develop your own front-end application to interact with the API.

# Contributing

We welcome contributions to this project! Hard work matters to us, so we are ready to review PRs even if you try to do. So don't hesitate to raise a PR or an issue.

# License

This project is licensed under the MIT License. See the LICENSE file for details.
