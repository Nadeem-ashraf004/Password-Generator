import React, { useState, useCallback, useEffect, useRef } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()+={}[]~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);

    // Show the toast notification
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000); // Hide after 2 seconds
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='bg-black min-h-screen flex items-center justify-center p-5'>
      <div className='bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md'>
        <h1 className='text-4xl text-center text-white mb-6'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type='text'
            value={password} 
            className='outline-none w-full py-1 px-3 bg-gray-200 text-black'
            placeholder='Generated Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-500 text-white px-3 py-1 shrink-0 hover:bg-blue-700 transition-colors'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input 
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor='numberInput'>Include Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor='characterInput'>Include Special Characters</label>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded'>
            Password Copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
