import React, { useState } from 'react';
import { Send, Shield, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/soundService';

const TRANSMISSION_STEPS = [
  "INITIALIZING UPLINK...",
  "CONNECTING...",
  "ENCRYPTING PAYLOAD [AES-256]...",
  "TRANSMITTING DATA PACKETS...",
  "MESSAGE RECEIVED // LOGGED IN CORE",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [transmitting, setTransmitting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorResponse) setErrorResponse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorResponse("All communication parameters are required.");
      return;
    }

    setTransmitting(true);
    setErrorResponse(null);
    setSuccessResponse(null);
    setCurrentStepIndex(0);
    sound.playTransmission();

    // Sequence through futuristic transmission states
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 450);

    try {
      const response = await api.postContact(formData);
      clearInterval(stepInterval);
      setCurrentStepIndex(4);
      sound.playSuccess();

      setTimeout(() => {
        setSuccessResponse(response);
        setTransmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 600);
    } catch (err) {
      clearInterval(stepInterval);
      setTransmitting(false);
      setErrorResponse(err.message || "Failed to broadcast signal to grid core.");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>// SECURE TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            COMMUNICATION <span className="text-glow-cyan text-tron-cyan">CONSOLE</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Broadcast encrypted message signals directly to Shubranil's personal terminal
          </p>
        </div>

        {/* Contact HUD Panel */}
        <div className="tron-panel p-6 sm:p-10 relative">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          {/* Active Transmission State Overlay */}
          {transmitting && (
            <div className="absolute inset-0 bg-tron-dark/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-tron-cyan/40 border-t-tron-cyan animate-spin flex items-center justify-center shadow-cyan-glow" />
              <div className="font-mono text-sm sm:text-base font-bold text-tron-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                {TRANSMISSION_STEPS[currentStepIndex]}
              </div>
              <div className="w-64 h-1.5 bg-slate-900 border border-tron-border rounded overflow-hidden">
                <div
                  className="h-full bg-tron-cyan shadow-cyan-glow transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / TRANSMISSION_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Banner */}
          {successResponse && (
            <div className="mb-6 p-4 rounded bg-emerald-950/40 border border-tron-green/50 text-tron-green font-mono text-xs flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="font-bold">
                    SIGNAL RECEIVED: {successResponse.transmission_code}
                  </div>
                  <div className="text-emerald-300/80 mt-0.5">
                    {successResponse.message}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSuccessResponse(null)}
                className="text-emerald-400 hover:underline text-[10px]"
              >
                DISMISS
              </button>
            </div>
          )}

          {/* Error Banner */}
          {errorResponse && (
            <div className="mb-6 p-4 rounded bg-rose-950/40 border border-tron-red/60 text-rose-300 font-mono text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertTriangle className="w-5 h-5 text-tron-red flex-shrink-0" />
              <span>{errorResponse}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-tron-cyan uppercase tracking-wider">
                  IDENTITY / DESIGNATION
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Elena Flynn / Technical Recruiter"
                  required
                  className="w-full px-4 py-3 bg-tron-dark/90 border border-tron-border rounded font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-tron-cyan focus:shadow-cyan-glow-sm transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-tron-cyan uppercase tracking-wider">
                  RETURN FREQUENCY / EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. user@encom.net"
                  required
                  className="w-full px-4 py-3 bg-tron-dark/90 border border-tron-border rounded font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-tron-cyan focus:shadow-cyan-glow-sm transition-all"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-tron-cyan uppercase tracking-wider">
                TRANSMISSION SUBJECT PROTOCOL
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Discussion on Data Science Internship / RAG Project"
                required
                className="w-full px-4 py-3 bg-tron-dark/90 border border-tron-border rounded font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-tron-cyan focus:shadow-cyan-glow-sm transition-all"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-tron-cyan uppercase tracking-wider">
                PAYLOAD / MESSAGE CONTENT
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Provide transmission details, project specifications, or collaboration queries..."
                required
                className="w-full px-4 py-3 bg-tron-dark/90 border border-tron-border rounded font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-tron-cyan focus:shadow-cyan-glow-sm transition-all resize-none"
              />
            </div>

            {/* Transmit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-tron-cyan" />
                <span>RATE-LIMITED & SERVER-SIDE VERIFIED PROTOCOL</span>
              </div>

              <button
                type="submit"
                disabled={transmitting}
                className="cyber-btn w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT MESSAGE</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
