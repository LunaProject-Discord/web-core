import { useEffect, useRef, useState } from 'react';

/**
 * Y軸方向のスクロール量を取得するカスタムフック
 */
export const useScrollPosition = () => {
    const isProcessing = useRef(false);
    const [positionY, setPositionY] = useState(0);

    useEffect(() => {
        const handler = () => {
            if (isProcessing.current) return;
            isProcessing.current = true;
            window.requestAnimationFrame(() => {
                isProcessing.current = false;
                setPositionY(window.scrollY);
            });
        };

        // スクロールイベントの登録
        document.addEventListener('scroll', handler, { passive: true });
        return () => document.removeEventListener('scroll', handler);
    }, []);

    // スクロール量を返却する
    return positionY;
};

/**
 * スクロール方向の識別子
 */
export type ScrollDirectionType = 'up' | 'down';

/**
 * スクロール方向を取得するカスタムフック
 */
export const useScrollDirection = (): ScrollDirectionType | null => {
    const positionY = useScrollPosition();
    const previousPositionY = useRef(positionY);
    const [direction, setDirection] = useState<ScrollDirectionType | null>(null);

    useEffect(() => {
        if (positionY < previousPositionY.current) {
            setDirection('up');
        } else if (positionY > previousPositionY.current) {
            setDirection('down');
        } else {
            setDirection(null);
        }

        previousPositionY.current = positionY;
    }, [positionY]);

    return direction;
};
