import type {KeyboardEvent} from 'react';

/**
 * Возвращает атрибуты доступности для карточки, кликабельной как кнопка.
 * @param onActivate Обработчик активации карточки.
 */
export const getCardA11yProps = (onActivate: () => void) => ({
    role: 'button' as const,
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onActivate();
        }
    },
});
