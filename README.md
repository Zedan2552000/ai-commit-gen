# 🤖 AI Commit Generator

Say goodbye to "fixed bug" or "updated files" commit messages! `ai-commit-gen` is a zero-dependency CLI tool that uses Google's Gemini AI to analyze your staged Git changes and generate a perfect, professional commit message automatically.

## ✨ Features
- **Smart Analysis:** Reads `git diff --staged` and understands exactly what you changed.
- **Lightning Fast:** Uses the Gemini 1.5 Flash model for instant results.
- **Zero Configuration:** Just drop in your API key and you're good to go.
- **Safe:** It only *suggests* the message. It prints it for you to review before actually committing.

## 🚀 Installation & Usage

1. **Clone this repository:**
   \`\`\`bash
   git clone https://github.com/Zedan2552000/ai-commit-gen.git
   cd ai-commit-gen
   \`\`\`

2. **Set your API Key:**
   Get a free key from [Google AI Studio](https://aistudio.google.com/) and set it in your terminal:
   \`\`\`bash
   export GEMINI_API_KEY="your_api_key_here"
   \`\`\`
   *(On Windows PowerShell, use `$env:GEMINI_API_KEY="your_api_key_here"`)*

3. **Link the CLI globally (Optional):**
   \`\`\`bash
   npm link
   \`\`\`

4. **Use it:**
   Whenever you've staged files (`git add .`), simply run:
   \`\`\`bash
   ai-commit
   \`\`\`
   Or if you didn't link it globally:
   \`\`\`bash
   node index.js
   \`\`\`

## 🛠️ Built With
- Node.js (Vanilla `fetch` API)
- Child Process (for executing Git commands)
- Google Gemini API

## 📝 License
MIT License
