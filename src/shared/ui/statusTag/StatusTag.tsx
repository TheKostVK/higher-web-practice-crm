import {Tag, type TagProps} from 'antd';
import type {ReactNode} from 'react';

type TStatusTagProps = {
    label: ReactNode;
    color?: TagProps['color'];
};

/**
 * Отображает статус в виде тега.
 * @param label Текст или содержимое статуса.
 * @param color Цвет тега.
 * @returns Тег статуса.
 */
export const StatusTag = ({label, color}: TStatusTagProps) => <Tag color={color}>{label}</Tag>;
