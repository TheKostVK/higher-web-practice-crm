import type {ReactNode} from "react";

type TCellCustomStyle = 'default' | 'primaryText' | 'email' | 'phone' | 'secondText' | 'boldText';

export interface CellCustomProps {
    children: ReactNode;
    variant: TCellCustomStyle;
}

export const CellCustom = ({children, variant = 'default'}: CellCustomProps) => {
    switch (variant) {
        case 'primaryText': {
            return (
                <span>
                    {children}
                </span>
            );
        }
        case 'email': {
            return (
                <span>
                    {children}
                </span>
            );
        }

        case 'phone': {
            return (
                <span>
                    {children}
                </span>
            );
        }

        case 'secondText': {
            return (
                <span>
                    {children}
                </span>
            );
        }

        case 'boldText': {
            return (
                <span>
                    {children}
                </span>
            );
        }
        default: {
            return (
                <span>
                    {children}
                </span>
            );
        }
    }
};