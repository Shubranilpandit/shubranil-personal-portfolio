import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

/**
 * Minimal TRON Academic Timeline
 * Minimal futuristic vertical timeline based on official resume data.
 * Section #education
 */
export default function EducationSection() {
  const educationHistory = [
    {
      period: "2025 — 2027",
      degree: "MASTER OF COMPUTER APPLICATIONS (M.C.A.)",
      field: "Data Science & Computer Applications",
      institution: "MIT Vishwaprayag University, Solapur",
      grade: "CGPA: 7.92 / 10",
      status: "CURRENTLY PURSUING",
    },
    {
      period: "2022 — 2025",
      degree: "BACHELOR OF COMPUTER APPLICATIONS (B.C.A.)",
      field: "Computer Applications (Full Time)",
      institution: "Abhijit Kadam Institute of Management and Social Sciences, Solapur",
      grade: "CGPA: 9.00 / 10",
      status: "COMPLETED",
    },
    {
      period: "2022",
      degree: "HIGHER SECONDARY CERTIFICATE (12TH HSC)",
      field: "Science & Commerce Stream",
      institution: "DHB Soni College, Solapur",
      grade: "72.33%",
      status: "COMPLETED",
    },
    {
      period: "2020",
      degree: "SECONDARY SCHOOL CERTIFICATE (10TH SSC)",
      field: "General Secondary Curriculum",
      institution: "Raj Memorial English School, Solapur",
      grade: "65.00%",
      status: "COMPLETED",
    },
  ];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-tron-cyan tracking-[0.25em] mb-2">
            // 04. ACADEMIC TIMELINE
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase">
            EDUCATION MATRIX
          </h2>
          <div className="w-16 h-[2px] bg-tron-cyan mt-3 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Minimal Futuristic Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-tron-cyan/30 space-y-10">
          {educationHistory.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Node on Timeline Line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-tron-void border-2 border-tron-cyan group-hover:bg-tron-cyan transition-all group-hover:shadow-[0_0_12px_#00f0ff]" />

              {/* Node Card */}
              <div className="p-5 sm:p-6 rounded-lg bg-tron-void/80 border border-tron-border/80 group-hover:border-tron-cyan/50 transition-all">
                {/* Meta: Period & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-2">
                  <span className="text-tron-cyan font-bold tracking-widest">
                    {item.period}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-tron-dark border border-tron-border text-slate-400">
                    {item.status}
                  </span>
                </div>

                {/* Degree Title */}
                <h3 className="font-display font-black text-base sm:text-lg text-white group-hover:text-tron-cyan transition-colors tracking-wide">
                  {item.degree}
                </h3>

                {/* Institution */}
                <div className="font-sans text-xs sm:text-sm text-slate-300 mt-1">
                  {item.institution}
                </div>

                {/* Grade Badge */}
                <div className="mt-3 inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan font-semibold">
                  <span>{item.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
