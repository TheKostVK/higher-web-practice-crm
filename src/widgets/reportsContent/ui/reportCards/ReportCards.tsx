import {memo, type ReactNode} from 'react';

import Styles from './reportCards.module.css';

export type TReportCardTone = 'default' | 'danger' | 'success';

export type TReportCardField = {
    label?: ReactNode;
    value: ReactNode;
};

export type TReportCardItem = {
    id: string;
    title: ReactNode;
    fields: TReportCardField[];
    meta?: ReactNode;
    status?: ReactNode;
    tone?: TReportCardTone;
};

type TReportCardsProps = {
    items: TReportCardItem[];
    emptyText?: string;
};

/**
 * Рендерит мобильные карточки отчётов.
 * @param props Свойства списка карточек.
 */
export const ReportCards = memo(({items, emptyText = 'Нет данных'}: TReportCardsProps) => {
    if (items.length === 0) {
        return <div className={Styles.reportCards__empty}>{emptyText}</div>;
    }

    return (
        <div className={Styles.reportCards}>
            {items.map((item) => (
                <article
                    key={item.id}
                    className={`${Styles.reportCards__card} ${item.tone ? Styles[`reportCards__card--${item.tone}`] : ''}`}
                    aria-label={typeof item.title === 'string' ? item.title : undefined}
                >
                    {(item.meta || item.status) && (
                        <div className={Styles.reportCards__header}>
                            {item.meta && <span className={Styles.reportCards__meta}>{item.meta}</span>}
                            {item.status && <span className={Styles.reportCards__status}>{item.status}</span>}
                        </div>
                    )}
                    <h3 className={Styles.reportCards__title}>{item.title}</h3>
                    <dl className={Styles.reportCards__fields}>
                        {item.fields.map((field, index) => (
                            <div key={index} className={Styles.reportCards__field}>
                                {field.label && <dt className={Styles.reportCards__fieldLabel}>{field.label}</dt>}
                                <dd className={Styles.reportCards__fieldValue}>{field.value}</dd>
                            </div>
                        ))}
                    </dl>
                </article>
            ))}
        </div>
    );
});
