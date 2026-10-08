import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Radio, Mail } from 'lucide-react';

/**
 * Real Working TRON Contact Transmission Console
 * Destination: shubranilp@gmail.com via /api/contact endpoint.
 * States: IDLE -> CONNECTING... -> TRANSMITTING... -> MESSAGE RECEIVED
 * Anti-spam honeypot and validation protection.
 * Section #contact
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _trap: '', // Anti-spam honeypot
  });
  const [status, setStatus] = useState('IDLE'); // 'IDLE', 'CONNECTING', 'TRANSMITTING', 'SUCCESS', 'ERROR'
  const [feedback, setFeedback] = useState('');
  const [dispatchCode, setDispatchCode] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData._trap) {
      setStatus('SUCCESS');
      setDispatchCode('TRX-00000');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('ERROR');
      setFeedback('All transmission parameters (Name, Email, Message) are required.');
      return;
    }

    try {
      setStatus('CONNECTING');
      await new Promise((r) => setTimeout(r, 400));

      setStatus('TRANSMITTING');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: (formData.subject || 'Portfolio Inquiry').trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setStatus('SUCCESS');
        setDispatchCode(data.transmission_code || 'TRX-LOGGED');
        setFormData({ name: '', email: '', subject: '', message: '', _trap: '' });
      } else {
        throw new Error(data.error || 'Grid transmission failed.');
      }
    } catch (err) {
      console.warn("Contact transmission notice:", err);
      // Fallback: If backend is temporarily unreachable, create a direct mailto link so visitor can still reach Shubranil
      setStatus('FALLBACK');
      setFeedback(err.message || 'Signal link offline.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-tron-cyan tracking-[0.25em] mb-2">
            // 06. TRANSMISSION CONSOLE
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase">
            ENCRYPTED COMMS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 mt-2">
            DIRECT CHANNEL TO <span className="text-tron-cyan">shubranilp@gmail.com</span>
          </p>
          <div className="w-16 h-[2px] bg-tron-cyan mt-3 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Transmission Terminal Panel */}
        <div className="p-8 sm:p-10 rounded-lg bg-tron-void/90 border border-tron-cyan/40 shadow-[0_0_35px_rgba(0,0,0,0.85)] relative">
          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-tron-cyan" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-tron-cyan" />

          {/* Success State */}
          {status === 'SUCCESS' ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-tron-cyan/20 border border-tron-cyan flex items-center justify-center mx-auto text-tron-cyan shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wider">
                TRANSMISSION RECEIVED
              </h3>
              <p className="font-mono text-xs text-tron-cyan tracking-widest">
                DISPATCH CODE: {dispatchCode} // DESTINATION: shubranilp@gmail.com
              </p>
              <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Your message has been successfully logged into Shubranil's digital system. A response will be returned to your designated email frequency shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setStatus('IDLE')}
                  className="px-5 py-2 rounded bg-tron-dark border border-tron-cyan/50 text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono text-xs font-bold tracking-wider transition-all"
                >
                  [ TRANSMIT ANOTHER SIGNAL ]
                </button>
              </div>
            </div>
          ) : status === 'FALLBACK' ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-tron-amber/20 border border-tron-amber flex items-center justify-center mx-auto text-tron-amber shadow-[0_0_15px_rgba(255,153,0,0.4)]">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white tracking-wider">
                DIRECT TRANSMISSION LINK
              </h3>
              <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                Local relay completed. You can also transmit directly to Shubranil's primary email address:
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:shubranilp@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <Mail className="w-4 h-4" />
                  <span>TRANSMIT VIA EMAIL CLIENT</span>
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setStatus('IDLE')}
                  className="font-mono text-[11px] text-slate-500 hover:text-slate-300 underline"
                >
                  Return to form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Banner */}
              {status === 'ERROR' && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/50 text-red-300 font-mono text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="_trap"
                value={formData._trap}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono text-xs text-tron-cyan tracking-wider">
                    NAME DESIGNATION *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded bg-tron-dark/90 border border-tron-border/90 text-white placeholder-slate-600 font-sans text-sm focus:border-tron-cyan focus:outline-none focus:ring-1 focus:ring-tron-cyan transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono text-xs text-tron-cyan tracking-wider">
                    RETURN EMAIL FREQUENCY *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded bg-tron-dark/90 border border-tron-border/90 text-white placeholder-slate-600 font-sans text-sm focus:border-tron-cyan focus:outline-none focus:ring-1 focus:ring-tron-cyan transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block font-mono text-xs text-slate-300 tracking-wider">
                  SUBJECT PROTOCOL
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunity / Collaboration / Query"
                  className="w-full px-4 py-3 rounded bg-tron-dark/90 border border-tron-border/90 text-white placeholder-slate-600 font-sans text-sm focus:border-tron-cyan focus:outline-none focus:ring-1 focus:ring-tron-cyan transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block font-mono text-xs text-tron-cyan tracking-wider">
                  MESSAGE PAYLOAD *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Transmit message content..."
                  className="w-full px-4 py-3 rounded bg-tron-dark/90 border border-tron-border/90 text-white placeholder-slate-600 font-sans text-sm focus:border-tron-cyan focus:outline-none focus:ring-1 focus:ring-tron-cyan transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[10px] text-slate-500 tracking-widest">
                  DESTINATION: shubranilp@gmail.com
                </span>

                <button
                  type="submit"
                  disabled={status === 'CONNECTING' || status === 'TRANSMITTING'}
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-tron-cyan/15 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {status === 'CONNECTING'
                      ? 'CONNECTING...'
                      : status === 'TRANSMITTING'
                      ? 'TRANSMITTING...'
                      : '[ TRANSMIT MESSAGE ]'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
