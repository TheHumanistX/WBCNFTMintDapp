import React, { useState, useEffect } from 'react';

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTransitionDone, setIsTransitionDone] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsTransitionDone(true);
            }, 500); // 500ms should match your CSS transition duration
            return () => clearTimeout(timer); // Clean up on component unmount
        } else {
            setIsTransitionDone(false);
        }
    }, [isOpen]);

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <button className="toggle-button" onClick={toggleMenu}>
                    {isOpen ? 'X' : '⇦'}
                </button>
                {isOpen && <div className='menu-content'>
                    <div className={`menu-container ${isTransitionDone ? 'fade-in' : ''}`}>
                        <div className='menu-text'>Bored Apes Yacht Club</div>
                        <div className='menu-text'>Samurai Saga</div>
                        <div className='menu-text'>Sleepy Sloth Society</div>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default SidebarMenu;
