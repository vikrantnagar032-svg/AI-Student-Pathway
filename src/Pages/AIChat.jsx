import { useState, useRef, useEffect } from 'react';



function getAIResponse(userMessage) {
  const rules = [
    {
      match: /program|option/i,
      response:
        'Based on your profile analysis, here are your top 3 options:\n\n' +
        '1. Big Data Analytics – Seneca College (94% match)\n' +
        '   Perfect academic alignment, strong PGWP eligibility\n\n' +
        '2. Software Engineering Tech – Conestoga College (91% match)\n' +
        '   High job placement rate\n\n' +
        '3. Business Analytics – Humber College (88% match)\n' +
        '   Great PR pathway alignment in Ontario',
    },
    {
      match: /score|eligib/i,
      response:
        'Your current eligibility score is 82%. The biggest opportunity to ' +
        'improve it is your Language Fit (currently 72%) — retaking IELTS ' +
        'could raise your overall score by up to 8%.',
    },
    {
      match: /\bpr\b|permanent residence/i,
      response:
        'Your PR Pathway Probability is currently rated High. Ontario and ' +
        'BC show the strongest alignment based on your occupation and ' +
        'academic background.',
    },
    {
      match: /sop|statement of purpose/i,
      response:
        'Your SOP currently scores 74% on clarity. The intent section could ' +
        'be more specific — mention the exact program name and one concrete ' +
        'career goal tied to it.',
    },
    {
      match: /.*/,
      response:
        'I can help with program matches, your eligibility score, PR ' +
        'pathway options, or your application checklist. What would you ' +
        'like to know more about?',
    },
  ];

  return rules.find((r) => r.match.test(userMessage)).response;
}

const QUICK_ACTIONS = [
  'Best options for my profile?',
  'Why is my eligibility score low?',
  'Can I get PR in BC?',
  'Fix my SOP',
];

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AIChat({ studentProfile }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text:
        "Hi! I'm here to help with your study and PR pathway. Ask me " +
        'anything about your programs, scores, or applications.',
      time: formatTime(new Date()),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || isTyping) return;

    const userMsg = { id: Date.now(), sender: 'user', text, time: formatTime(new Date()) };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated network delay — remove once this calls a real backend.
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: getAIResponse(text, studentProfile),
        time: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="ai-chat-page">
      <div className="ai-chat-header">
        <div className="ai-avatar">✦</div>
        <div>
          <h2>AI Assistant</h2>
          <p>
            <span className="status-dot" /> Online &amp; Ready
          </p>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-row ${msg.sender}`}>
            {msg.sender === 'ai' && <div className="ai-avatar small">✦</div>}
            <div className="chat-bubble">
              <p>{msg.text}</p>
              <span className="chat-time">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row ai">
            <div className="ai-avatar small">✦</div>
            <div className="chat-bubble typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="ai-quick-actions">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            className="quick-action-chip"
            onClick={() => sendMessage(action)}
          >
            {action}
          </button>
        ))}
      </div>

      <form className="ai-chat-input-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          aria-label="Message the AI assistant"
        />
        <button type="submit" aria-label="Send message" disabled={!input.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}
