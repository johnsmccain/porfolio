import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <button
      className={`h-16 text-xl font-medium rounded-lg transition-all duration-150 active:scale-95 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-4 flex flex-col">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Display */}
        <div className="bg-black rounded-t-2xl p-6 mb-1">
          <div className="text-right">
            <div className="text-4xl font-light overflow-hidden">
              {display}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-1 bg-gray-800 p-4 rounded-b-2xl">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="bg-gray-600 hover:bg-gray-500 text-black font-semibold"
          >
            AC
          </Button>
          <Button
            onClick={() => {}}
            className="bg-gray-600 hover:bg-gray-500 text-black font-semibold"
          >
            ±
          </Button>
          <Button
            onClick={() => {}}
            className="bg-gray-600 hover:bg-gray-500 text-black font-semibold"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation('÷')}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold"
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber('7')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber('8')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber('9')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation('×')}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold"
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber('4')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber('5')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber('6')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation('-')}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold"
          >
            −
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber('1')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber('2')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber('3')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation('+')}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold"
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber('0')}
            className="bg-gray-700 hover:bg-gray-600 text-white col-span-2"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}