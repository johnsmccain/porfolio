'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Bird {
  x: number;
  y: number;
  velocity: number;
  rotation: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const FlappyBird: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bird, setBird] = useState<Bird>({ x: 100, y: 200, velocity: 0, rotation: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const gameRef = useRef({
    bird: { x: 100, y: 200, velocity: 0, rotation: 0 },
    pipes: [] as Pipe[],
    particles: [] as Particle[],
    score: 0,
    gameState: 'menu' as 'menu' | 'playing' | 'gameOver',
    frameCount: 0
  });

  // Game constants
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;
  const BIRD_SIZE = 28;
  const PIPE_WIDTH = 60;
  const PIPE_GAP = 160;
  const GRAVITY = 0.4;
  const JUMP_FORCE = -8;
  const PIPE_SPEED = 2;
  const MAX_ROTATION = 25;
  const ROTATION_SPEED = 3;

  useEffect(() => {
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBirdHighScore', score.toString());
    }
  }, [score, highScore]);

  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color: `hsl(${Math.random() * 60 + 40}, 100%, 60%)`
      });
    }
    gameRef.current.particles.push(...newParticles);
    setParticles(gameRef.current.particles);
  }, []);

  const resetGame = useCallback(() => {
    const newBird = { x: 100, y: 200, velocity: 0, rotation: 0 };
    setBird(newBird);
    setPipes([]);
    setScore(0);
    setParticles([]);
    gameRef.current = {
      bird: newBird,
      pipes: [],
      particles: [],
      score: 0,
      gameState: 'playing',
      frameCount: 0
    };
  }, []);

  const jump = useCallback(() => {
    if (gameRef.current.gameState === 'playing') {
      gameRef.current.bird.velocity = JUMP_FORCE;
      gameRef.current.bird.rotation = -MAX_ROTATION;
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE, rotation: -MAX_ROTATION }));
      createParticles(gameRef.current.bird.x, gameRef.current.bird.y + BIRD_SIZE / 2);
    } else if (gameRef.current.gameState === 'menu') {
      resetGame();
      setGameState('playing');
    } else if (gameRef.current.gameState === 'gameOver') {
      resetGame();
      setGameState('playing');
    }
  }, [resetGame, createParticles, JUMP_FORCE, MAX_ROTATION, BIRD_SIZE]);

  const checkCollision = useCallback((bird: Bird, pipes: Pipe[]): boolean => {
    if (bird.y + BIRD_SIZE >= CANVAS_HEIGHT || bird.y <= 0) {
      return true;
    }

    for (const pipe of pipes) {
      if (
        bird.x + BIRD_SIZE > pipe.x &&
        bird.x < pipe.x + PIPE_WIDTH &&
        (bird.y < pipe.topHeight || bird.y + BIRD_SIZE > CANVAS_HEIGHT - pipe.bottomHeight)
      ) {
        return true;
      }
    }

    return false;
  }, []);

  const generatePipe = useCallback((): Pipe => {
    const minTop = 80;
    const maxTop = CANVAS_HEIGHT - PIPE_GAP - 80;
    const topHeight = Math.random() * (maxTop - minTop) + minTop;
    const bottomHeight = CANVAS_HEIGHT - topHeight - PIPE_GAP;
    return {
      x: CANVAS_WIDTH,
      topHeight,
      bottomHeight,
      passed: false
    };
  }, []);

  const gameLoop = useCallback(() => {
    if (gameRef.current.gameState !== 'playing') return;

    gameRef.current.frameCount++;
    gameRef.current.bird.velocity += GRAVITY;
    gameRef.current.bird.y += gameRef.current.bird.velocity;
    
    if (gameRef.current.bird.velocity < 0) {
      gameRef.current.bird.rotation = Math.max(-MAX_ROTATION, gameRef.current.bird.rotation - ROTATION_SPEED);
    } else {
      gameRef.current.bird.rotation = Math.min(MAX_ROTATION, gameRef.current.bird.rotation + ROTATION_SPEED);
    }

    gameRef.current.particles = gameRef.current.particles.map(p => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.2,
      life: p.life - 0.02
    })).filter(p => p.life > 0);

    const currentSpeed = PIPE_SPEED + Math.floor(gameRef.current.score / 10) * 0.2;
    gameRef.current.pipes = gameRef.current.pipes.map(pipe => ({
      ...pipe,
      x: pipe.x - currentSpeed
    }));

    gameRef.current.pipes = gameRef.current.pipes.filter(pipe => pipe.x + PIPE_WIDTH > 0);

    if (gameRef.current.pipes.length === 0 || gameRef.current.pipes[gameRef.current.pipes.length - 1].x < CANVAS_WIDTH - 280) {
      gameRef.current.pipes.push(generatePipe());
    }

    gameRef.current.pipes.forEach(pipe => {
      if (!pipe.passed && pipe.x + PIPE_WIDTH < gameRef.current.bird.x) {
        pipe.passed = true;
        gameRef.current.score++;
      }
    });

    if (checkCollision(gameRef.current.bird, gameRef.current.pipes)) {
      gameRef.current.gameState = 'gameOver';
      setGameState('gameOver');
      createParticles(gameRef.current.bird.x + BIRD_SIZE / 2, gameRef.current.bird.y + BIRD_SIZE / 2);
    }

    setBird({ ...gameRef.current.bird });
    setPipes([...gameRef.current.pipes]);
    setScore(gameRef.current.score);
    setParticles([...gameRef.current.particles]);
  }, [checkCollision, generatePipe, createParticles]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 16);
    return () => clearInterval(interval);
  }, [gameLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState === 'playing' || gameState === 'gameOver') {
      pipes.forEach(pipe => {
        const topGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
        topGradient.addColorStop(0, '#2D5016');
        topGradient.addColorStop(0.5, '#3A6B1F');
        topGradient.addColorStop(1, '#2D5016');
        ctx.fillStyle = topGradient;
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.fillRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
      });

      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.translate(bird.x + BIRD_SIZE / 2, bird.y + BIRD_SIZE / 2);
      ctx.rotate((bird.rotation * Math.PI) / 180);
      
      const birdGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, BIRD_SIZE);
      birdGradient.addColorStop(0, '#FFD700');
      birdGradient.addColorStop(0.7, '#FFA500');
      birdGradient.addColorStop(1, '#FF8C00');
      ctx.fillStyle = birdGradient;
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      ctx.fillStyle = 'white';
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 4;
      ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeText(score.toString(), CANVAS_WIDTH / 2, 60);
      ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 60);
    }
  }, [bird, pipes, gameState, score, particles]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      <div className="relative shadow-2xl rounded-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={jump}
          className="border-4 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer bg-sky-200 transition-all hover:border-gray-300 dark:hover:border-gray-600"
        />
        
        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm rounded-2xl">
            <div className="text-center transform -translate-y-8">
              <h1 className="text-6xl font-bold text-white mb-2 font-mono drop-shadow-lg animate-pulse">
                Flappy Bird
              </h1>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8 rounded-full"></div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
                <p className="text-white text-xl mb-3 font-semibold">How to Play:</p>
                <p className="text-white text-lg mb-2">Click or press Space to jump</p>
                <p className="text-white text-lg mb-2">Avoid the pipes</p>
                <p className="text-white text-lg mb-3">Get the highest score!</p>
                {highScore > 0 && (
                  <>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-3"></div>
                    <p className="text-white text-lg font-semibold">
                      High Score: {highScore}
                    </p>
                  </>
                )}
              </div>
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg inline-block hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                Click to Start
              </div>
            </div>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/80 via-black/70 to-red-900/80 backdrop-blur-sm rounded-2xl animate-in fade-in duration-300">
            <div className="text-center transform scale-100 animate-in zoom-in duration-500">
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Game Over!</h2>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border-2 border-white/30">
                <div className="mb-4">
                  <p className="text-gray-300 text-lg mb-2">Your Score</p>
                  <p className="text-6xl font-bold text-yellow-400 drop-shadow-lg">{score}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4"></div>
                <div>
                  <p className="text-gray-300 text-lg mb-2">Best Score</p>
                  <p className="text-4xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-2">
                    {highScore}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg inline-block hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                Click to Restart
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlappyBird;