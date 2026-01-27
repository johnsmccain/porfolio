import React, { useRef, useState, useEffect } from 'react';

const colors = [
  '#FF3B30', '#FF9500', '#FFCC02', '#34C759', '#007AFF', '#5856D6', '#AF52DE', '#FF2D92',
  '#A2845E', '#8E8E93', '#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
];

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#007AFF');
  const [tool, setTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.lineTo(x, y);
      context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      context.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 h-full flex flex-col">
        {/* Tool bar */}
        <div className="bg-white/40 backdrop-blur-sm px-6 py-3 border-b border-gray-200/50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Tool selection */}
              <div className="flex bg-gray-100/60 rounded-2xl p-1">
                <button
                  className={`px-4 py-2 rounded-xl transition-all ${
                    tool === 'brush' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                  onClick={() => setTool('brush')}
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Brush
                </button>
                <button
                  className={`px-4 py-2 rounded-xl transition-all ${
                    tool === 'eraser' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                  onClick={() => setTool('eraser')}
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eraser
                </button>
              </div>

              {/* Brush size slider */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">Size</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500 w-6">{brushSize}</span>
              </div>
            </div>

            <button 
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-200/50 text-gray-600 flex items-center justify-center"
              onClick={clearCanvas}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-grow bg-white/20 backdrop-blur-sm m-4 rounded-2xl overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>

        {/* Color palette */}
        <div className="bg-white/40 backdrop-blur-sm px-6 py-4 rounded-b-3xl border-t border-gray-200/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium mr-3">Colors</span>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 p-0 rounded-full border-2 transition-all hover:scale-110 ${
                    color === c 
                      ? 'border-gray-400 shadow-lg scale-110' 
                      : 'border-white/50 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}