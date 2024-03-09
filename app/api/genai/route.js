const axios = require('axios');

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const config = {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
};

const API_KEY = process.env.YOUR_API_KEY;
const MODEL_NAME = "gemini-1.0-pro";

async function runChat(inputData) {
    console.log(inputData);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    const result = await chat.sendMessage(inputData);
    return result.response.text();
}

async function fetchRepoContent(repoOwner, repoName, path = '') {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
    const response = await axios.get(apiUrl, config);
    const contents = response.data;

    let mdxContent = '';
    let pdfContent = '';

    for (const entry of contents) {
        if (entry.type === 'file') {
            console.log('file');
            const fileExtension = entry.name.split('.').pop().toLowerCase();
            if (!['jpg', 'jpeg', 'png', 'gif', 'ico', 'md', 'json', 'svg', 'otf', 'gif', 'txt'].includes(fileExtension)) {
                const fileContent = await axios.get(entry.download_url, { responseType: 'text' }).then(res => res.data);
                mdxContent += `\`${entry.path}\`\n\n\`\`\`javascript\n${fileContent}\n\`\`\`\n\n`;
                pdfContent += `File Path: ${entry.path}\n\nCode:\n\n${fileContent}\n\n`;
            }
        } else if (entry.type === 'dir') {
            console.log('dir');
            const { mdxContent: nestedMdxContent, pdfContent: nestedPdfContent } = await fetchRepoContent(repoOwner, repoName, entry.path);
            mdxContent += `## ${entry.path}\n\n${nestedMdxContent}`;
            pdfContent += `## ${entry.path}\n\n${nestedPdfContent}`;
        }
    }

    if (path === '') {
        mdxContent = '# Repository Code\n\n' + mdxContent;
    }

    return { mdxContent, pdfContent };
}

async function fetchIssues(repoOwner, repoName) {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
    const response = await axios.get(apiUrl, config);
    return response.data;
}

export async function POST(request) {
    const res = await request.json();
    const { githubRepoURL, customChanges, issueNumber } = res;

    try {

        const urlParts = githubRepoURL.split('/');
        const repoOwner = urlParts[urlParts.length - 2];
        const repoName = urlParts[urlParts.length - 1].replace('.git', '');

        const { mdxContent: finalMdxContent, pdfContent: finalPdfContent } = await fetchRepoContent(repoOwner, repoName);
        const issues = await fetchIssues(repoOwner, repoName);

        let modifiedCode = `You are a software developer. Below is the Code, issues and User request to make changes. Make sure to make changes in the code given according to the issue given by fixing the issue:\n\n\n${finalMdxContent}\n\nCustom Changes:\n${customChanges}`;

        if (issueNumber) {
            const targetIssue = issues.find(issue => issue.number === issueNumber);
            if (targetIssue) {
                modifiedCode += `\n\nFix the given Issue: ${issueNumber}:\n${targetIssue.title}\n${targetIssue.body}`;
            }
        }

        const response = await runChat(modifiedCode);
        return Response.json({ response });
    } catch (error) {
        console.error('Error:', error.message);
        return Response.json({ error: 'Internal server error' })
    }
}