"use client";

import React, { useState, useRef, useEffect } from "react";

interface LocalTrack {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  src: string;
}

const localTracks: LocalTrack[] = [
  {
    id: "local-1",
    name: "Mockingbird",
    artist: "Eminem",
    albumArt: "/music/mockingbird.jpg",
    src: "/music/mockingbird.mp3",
  },
  {
    id: "local-2",
    name: "Sample Track",
    artist: "Sample Artist",
    albumArt: "/music/sample.jpg",
    src: "/music/sample.mp3",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(localTracks[currentTrack].src);
    audio.preload = "auto";
    audio.volume = volume;

    const onTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
      setIsPlaying(!audio.paused);
    };
    const onEnded = () => {
      setCurrentTrack((t) => (t + 1) % localTracks.length);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [currentTrack, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const next = () => setCurrentTrack((t) => (t + 1) % localTracks.length);
  const prev = () => setCurrentTrack((t) => (t - 1 + localTracks.length) % localTracks.length);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="relative w-64 h-64 mb-6">
          <img
            src={localTracks[currentTrack].albumArt}
            alt={localTracks[currentTrack].name}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
          />
          <button
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isLiked ? "bg-red-500" : "bg-white bg-opacity-20"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <svg className={`w-4 h-4 ${isLiked ? "text-white" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-6 w-full">
          <h2 className="text-2xl font-bold mb-2 truncate">
            {localTracks[currentTrack].name}
          </h2>
          <p className="text-gray-400 mb-1 truncate">
            {localTracks[currentTrack].artist}
          </p>
        </div>

        <div className="w-full flex items-center space-x-2 mb-6">
          <span className="text-sm">{formatTime(progress)}</span>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={100}
              value={progressValue || 0}
              className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
              onChange={(e) => seek(parseFloat(e.target.value))}
            />
          </div>
          <span className="text-sm">{formatTime(duration)}</span>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-6">
          <button onClick={prev} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>
          <button onClick={togglePlay} className="bg-white text-black rounded-full p-3 hover:bg-gray-200">
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button onClick={next} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.987 3.987 0 0013 12a3.988 3.988 0 00-.172-1.415 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}