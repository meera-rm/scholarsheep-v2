import React, { useEffect, useState, useRef } from 'react';

const PHASES = {
  session: { label: 'Reading Time', emoji: '📖',
    light: 'from-teal-400 to-teal-600',
    dark: 'from-teal-700 to-teal-900',
    ring: '#ffffff',
  },
  shortbreak: { label: 'Snack Break', emoji: '🍎',
    light: 'from-orange-300 to-orange-500',
    dark: 'from-orange-600 to-orange-800',
    ring: '#ffffff',
  },
  longbreak: { label: 'Screen Break', emoji: '🎮',
    light: 'from-purple-400 to-purple-600',
    dark: 'from-purple-700 to-purple-900',
    ring: '#ffffff',
  },
};

const MyTimer = () => {
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [sessionLength, setSessionLength] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [activePhase, setActivePhase] = useState('session');
  const [sessionCount, setSessionCount] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Detect dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const phase = PHASES[activePhase];
  const totalTime = activePhase === 'session' ? sessionLength * 60
    : activePhase === 'shortbreak' ? shortBreak * 60
    : longBreak * 60;
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  // Timer tick
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Phase transitions
  useEffect(() => {
    if (timeLeft > 0) return;
    audioRef.current?.play();

    if (activePhase === 'session') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      if (newCount % 4 === 0) {
        setActivePhase('longbreak');
        setTimeLeft(longBreak * 60);
      } else {
        setActivePhase('shortbreak');
        setTimeLeft(shortBreak * 60);
      }
    } else {
      setActivePhase('session');
      setTimeLeft(sessionLength * 60);
    }
  }, [timeLeft]);

  const handleStartStop = () => setIsPlaying(!isPlaying);

  const handleReset = () => {
    setIsPlaying(false);
    setActivePhase('session');
    setTimeLeft(sessionLength * 60);
    setSessionCount(0);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const adjust = (type, delta) => {
    if (isPlaying) return;
    if (type === 'session') {
      const val = Math.max(1, Math.min(60, sessionLength + delta));
      setSessionLength(val);
      if (activePhase === 'session') setTimeLeft(val * 60);
    } else if (type === 'shortbreak') {
      setShortBreak(Math.max(1, Math.min(30, shortBreak + delta)));
    } else {
      setLongBreak(Math.max(1, Math.min(30, longBreak + delta)));
    }
  };

  const TimeSetter = ({ label, emoji, value, type }) => (
    <div style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)' }} className="backdrop-blur rounded-xl p-4 text-center">
      <p style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }} className="text-sm font-semibold mb-1">{emoji} {label}</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => adjust(type, -1)}
          disabled={isPlaying}
          style={{ color: t, backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}
          className="w-8 h-8 rounded-full font-bold transition disabled:opacity-30"
        >-</button>
        <span style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)' }} className="text-2xl font-bold w-10 text-center">{value}</span>
        <button
          onClick={() => adjust(type, 1)}
          disabled={isPlaying}
          style={{ color: t, backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}
          className="w-8 h-8 rounded-full font-bold transition disabled:opacity-30"
        >+</button>
      </div>
      <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }} className="text-xs font-medium mt-1">minutes</p>
    </div>
  );

  const bgColor = isDark ? phase.dark : phase.light;
  const t = isDark ? 'white' : 'black';

  return (
    <div className={`py-12 bg-gradient-to-br ${bgColor} rounded-2xl mx-4 my-6 shadow-xl`}>
      <div className="w-full max-w-lg mx-auto px-4">
        {/* Header */}
        <h1 style={{ color: t }} className="text-center text-3xl font-bold mb-2">Pomodoro Clock</h1>
        <p style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }} className="text-center text-base font-medium mb-8">
          Session {sessionCount + 1} · {phase.emoji} {phase.label}
        </p>

        {/* Timer Circle */}
        <div className="relative mx-auto w-56 h-56 mb-8">
          <svg className="w-56 h-56 -rotate-90" viewBox="0 0 256 256">
            <circle cx="128" cy="128" r="116" fill="none" stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} strokeWidth="8" />
            <circle
              cx="128" cy="128" r="116" fill="none" stroke={t} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 116}`}
              strokeDashoffset={`${2 * Math.PI * 116 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p style={{ color: t }} className="text-5xl font-mono font-bold tracking-wider">
              {minutes}:{seconds}
            </p>
            <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }} className="text-sm mt-1 capitalize">{phase.label}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleStartStop}
            className={`px-10 py-3 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
              isDark ? 'bg-white text-gray-800' : 'bg-white text-gray-800'
            }`}
          >
            {isPlaying ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            style={{ color: t, backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}
            className="px-6 py-3 font-medium rounded-full transition"
          >
            Reset
          </button>
        </div>

        {/* Time Setters */}
        <div className="grid grid-cols-3 gap-3">
          <TimeSetter label="Reading" emoji="📖" value={sessionLength} type="session" />
          <TimeSetter label="Snack" emoji="🍎" value={shortBreak} type="shortbreak" />
          <TimeSetter label="Screen" emoji="🎮" value={longBreak} type="longbreak" />
        </div>

        {/* Session dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                backgroundColor: i <= (sessionCount % 4)
                  ? t
                  : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                transform: i <= (sessionCount % 4) ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
          <span style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }} className="text-xs ml-2">long break after 4</span>
        </div>

        <audio
          ref={audioRef}
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
};

export default MyTimer;
