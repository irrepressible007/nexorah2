import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);
    const inputRef = ref || localRef;

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={inputRef}
            className={
                'w-full bg-[#111] border border-white/10 rounded-xl text-white text-sm px-5 py-3 focus:outline-none transition-all duration-300 placeholder:text-gray-600 placeholder:tracking-widest font-medium focus:border-pink-500 focus:bg-black shadow-inner ' +
                className
            }
        />
    );
});
