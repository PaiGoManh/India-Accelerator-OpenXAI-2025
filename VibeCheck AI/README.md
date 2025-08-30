# 🚦 VibeCheckAI – Make Every Comment Count

A Next.js app for **real-time sentiment analysis** of comments. VibeCheckAI classifies every comment as positive, negative, or neutral to help you improve moderation, protect your brand, and understand your community’s mood.

---

## Features

### 🔎 Comment Sentiment Checker
- **Live Sentiment Detection**: Instantly analyze the sentiment of any comment.
- **Classification**: Labels comments as Positive, Negative, or Neutral.
- **Real-time Feedback**: Results displayed immediately after analysis.

### 🛡️ Moderation and Brand Safety
- **Moderation Support**: Filter or flag negative comments quickly.
- **Community Insights**: Track overall community mood with sentiment trends.

### 🤖 Local & Private AI
- Run AI models **locally** with Ollama for data privacy.
- Easily switch between the **Phi-3** model or other supported Ollama models.

---

## 🚀 Getting Started

### Installation

1. Clone or navigate to your project folder.

2. Change directory to the Next.js app:

    ```
    cd nextjs-app
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Run the development server:

    ```
    npm run dev
    ```

5. Open your browser:

    ```
    http://localhost:3000
    ```

---

## 🤖 Using Phi-3 or Any Local Ollama Model

### Step 1: Install Ollama

you can check here -> https://ollama.com/


---

## 🧠 Model Pull Commands Reference

Pull these popular local models with Ollama:

- Phi-3 Mini:

    ```
    ollama pull phi3
    ```

- Llama3.2 1B:

    ```
    ollama pull llama3.2:1b
    ```

- Mistral:

    ```
    ollama pull mistral
    ```

Check available models at: [https://ollama.com/library](https://ollama.com/library)

---

## 🛠 Technologies Used

- Next.js 14 (React framework)
- TypeScript for type safety
- Tailwind CSS for styling
- Ollama for local LLM hosting and serving

---

## 🧑‍🏫 Use Cases

- Social media moderation with sentiment filtering
- Community engagement analysis and mood tracking
- Brand protection by detecting and handling negative comments
- Developers experimenting with local LLMs for sentiment tasks

---

## 💡 Further Reading & Resources

- Ollama GitHub: [https://github.com/ollama/ollama](https://github.com/ollama/ollama)
- Phi-3 Model on HuggingFace: [https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf)
- Ollama with Next.js Tutorials: [https://dev.to/abayomijohn273/building-an-ai-assistant-with-ollama-and-nextjs-part-2-using-packages-1nli](https://dev.to/abayomijohn273/building-an-ai-assistant-with-ollama-and-nextjs-part-2-using-packages-1nli)

---

VibeCheckAI helps **Make Every Comment Count** with lightning-fast, privacy-preserving, local sentiment analysis tailored to modern communities.


---

## 🎯 How to Use

1. Paste or write any comment in the input field on the UI.
2. Click **Analyze Sentiment**.
3. View the sentiment label (Positive, Negative, Neutral) and confidence score.
4. Use the output to moderate content or analyze community mood.

---

## 🎨 Customization

- Modify UI inside:

    ```
    app/page.tsx
    ```

- Change AI prompt or sentiment logic inside:

    ```
    app/api/sentiment/route.ts
    ```

- Update styles in:

    ```
    app/globals.css
    ```

- Swap the model by updating fetch calls to use your preferred Ollama model name.

---

## ⚡ API Usage Example (Local Phi-3 Model)

Example TypeScript fetch call to your local Ollama server running Phi-3:

