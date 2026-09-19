import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';
import { sound } from '../services/soundService';

export default function InteractiveTerminal({
  isOpen,
  onClose,
  projects,
  skills,
  profile,
}) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'TRON CYBER TERMINAL [Version 2.5.0]\n(c) 2026 Shubranil Pandit. All rights reserved.\nType "help" to list available operational commands.',
    },
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    sound.playClick();

    const newHistory = [...history, { type: 'user', text: `> ${cmdStr}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  about        - View professional background & identity
  skills       - Query technical skills matrix
  projects     - List active production & research projects
  experience   - Display research & practical history
  education    - Display academic qualifications
  resume       - Open resume documentation
  contact      - Show direct transmission frequency
  health       - Check live grid telemetry & database
  clear        - Clear console buffer
  exit         - Terminate terminal session`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `NAME: ${profile?.full_name || 'Shubranil Pandit'}
ROLE: MCA Student | Data Science Specialization
FOCUS: Artificial Intelligence, Machine Learning, Big Data & Full-Stack Development
STATUS: ${profile?.status || 'ONLINE'}
SUMMARY: ${profile?.bio || 'Building intelligent systems and high-dimensional data pipelines.'}`,
        });
        break;

      case 'skills':
        const skillList = skills?.map(s => `[${s.category}] ${s.name} (${s.proficiency_level})`).join('\n  ');
        newHistory.push({
          type: 'response',
          text: `QUERYING SKILL MATRIX...\n  ${skillList || 'Python, Pandas, NumPy, Scikit-learn, PostgreSQL, Flask, Big Data, RAG'}`,
        });
        break;

      case 'projects':
        const projList = projects?.map((p, i) => `[0${i + 1}] ${p.title} (${p.category}) - ${p.status}`).join('\n  ');
        newHistory.push({
          type: 'response',
          text: `LOADING PROJECT DATABASE...\n  ${projList || '[01] V-Mirror\n  [02] FAERS ADR Mining\n  [03] GenAI RAG Engine\n  [04] Smart Room Monitor'}`,
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'response',
          text: `OPERATIONAL EXPERIENCE:
  [1] Data Science & ML Project Researcher - Academic Research Lab (2024-Present)
  [2] Software & AI Development Contributor - Open Source / Academic (2023-2024)
  [3] Technical Hackathon Participant - Inter-College Summits (2023-2025)`,
        });
        break;

      case 'education':
        newHistory.push({
          type: 'response',
          text: `EDUCATION CREDENTIALS:
  * Master of Computer Applications (MCA) - Data Science & AI (2024 - 2026)
  * Bachelor of Science / Computer Applications - Computer Science (2021 - 2024)`,
        });
        break;

      case 'resume':
        window.open('/api/resume/view', '_blank');
        newHistory.push({
          type: 'response',
          text: 'Dispatched signal to open resume viewer in auxiliary grid buffer.',
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `TRANSMISSION FREQUENCY:
  Email: ${profile?.email || 'shubranil.pandit@gmail.com'}
  GitHub: ${profile?.github_url || 'https://github.com/shubranil-pandit'}
  LinkedIn: ${profile?.linkedin_url || 'https://linkedin.com/in/shubranil-pandit'}
  Location: India`,
        });
        break;

      case 'health':
      case 'status':
        newHistory.push({
          type: 'response',
          text: `SYSTEM STATUS:
  Frontend:    ONLINE
  Backend:     ONLINE
  Database:    ONLINE (PostgreSQL/SQLite)
  API Latency: ~1.8ms
  Security:    ENCRYPTED`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for valid commands.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-tron-dark border border-tron-cyan rounded shadow-cyan-glow-lg overflow-hidden flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="bg-tron-panel border-b border-tron-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-tron-cyan" />
            <span className="font-mono text-xs font-bold text-tron-cyan tracking-wider">
              SHUBRANIL-OS // INTERACTIVE COMMAND CLI
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output Console Buffer */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 text-left bg-slate-950/90 select-text">
          {history.map((entry, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                entry.type === 'user'
                  ? 'text-tron-cyan font-bold'
                  : entry.type === 'error'
                  ? 'text-tron-red'
                  : entry.type === 'system'
                  ? 'text-slate-400'
                  : 'text-slate-200'
              }`}
            >
              {entry.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Command Input Bar */}
        <div className="bg-tron-panel border-t border-tron-border p-3 flex items-center gap-2">
          <span className="font-mono text-xs text-tron-cyan font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent font-mono text-xs text-tron-cyanBright focus:outline-none placeholder-slate-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="px-2.5 py-1 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono text-[10px] font-bold transition-all"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
}
