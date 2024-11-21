// resizableHooks.jsx: Resize logic as a custom hook used to resize the Navbar and Aside in Layout
// Uses the ResizeObserver API to monitor resizing
import { useCallback } from 'react';
import { useResizerContext } from './ResizerContext';

export const useResizer = (minWidth, maxWidth, direction) => {
    const { setNavbarWidth, setAsideWidth } = useResizerContext();
    const isNavbar = direction === 'navbar';
    const setWidth = isNavbar ? setNavbarWidth : setAsideWidth;

    const handleMouseMove = useCallback((e) => {
        let newWidth;
        if (isNavbar) {
            newWidth = Math.min(Math.max(e.clientX - 60, minWidth), maxWidth);
        } else {
            newWidth = Math.min(Math.max(window.innerWidth - e.clientX, minWidth), maxWidth);
        }
        setWidth(newWidth);
    }, [minWidth, maxWidth, setWidth, isNavbar]);

    const handleMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = () => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return handleMouseDown;
};