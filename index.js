#!/usr/bin/env node
const { execSync } = require('child_process');

async function run() {
    console.log("🤖 AI Commit Gen (Gemini)");
    
    // Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ Error: GEMINI_API_KEY environment variable is not set.");
        console.log("Get one for free at: https://aistudio.google.com/");
        process.exit(1);
    }

    try {
        // Get git diff
        console.log("📦 Analyzing staged changes...");
        let diff = '';
        try {
            diff = execSync('git diff --staged', { encoding: 'utf8' });
        } catch (e) {
            console.error("❌ Error: Not a git repository or git is not installed.");
            process.exit(1);
        }

        if (!diff.trim()) {
            console.log("⚠️ No staged changes found. Did you forget to run `git add`?");
            process.exit(0);
        }

        console.log("✨ Generating commit message...");
        const prompt = `You are an expert developer. Analyze the following git diff and write a concise, professional commit message. 
Format: A single line summary (under 50 characters). If needed, add a blank line and a bulleted list of details.
Do not wrap it in quotes. Do not include introductory text.

Git Diff:
${diff.substring(0, 30000)}
`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            console.error("❌ API Error:", await response.text());
            process.exit(1);
        }

        const data = await response.json();
        const commitMsg = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!commitMsg) {
            console.error("❌ Failed to parse AI response.");
            process.exit(1);
        }

        console.log("\n✅ Generated Commit Message:\n");
        console.log("\x1b[36m%s\x1b[0m", commitMsg.trim()); // Print in Cyan color
        console.log("\n----------------------------------\n");
        
        console.log("To commit with this message, run:");
        console.log(`git commit -m "${commitMsg.trim().replace(/"/g, '\\"')}"`);

    } catch (error) {
        console.error("❌ Unhandled Error:", error.message);
    }
}

run();
