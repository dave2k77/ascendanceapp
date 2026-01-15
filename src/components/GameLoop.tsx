import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export const GameLoop = () => {
    const tick = useGameStore((state) => state.tick);
    const requestRef = useRef<number>(0); // Initialize with 0 or null
    const previousTimeRef = useRef<number | undefined>(undefined);

    const animate = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            // Calculate delta time in seconds
            const deltaTime = (time - previousTimeRef.current) / 1000;

            // Execute the game logic
            tick(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    return null; // Renders nothing visibly
};
