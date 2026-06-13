import Styles from '@/widgets/reportsContent/reportsContent.module.css';
import {DEAL_STATUS_LABELS} from '@/entities/deal';
import {formatAmount} from '@/shared/lib/formatters';
import type {TDealsStageReportRow} from '@/entities/reports';
import {SALES_STAGE_ORDER} from '@/widgets/reportsContent/model';
import {MobileReportBody} from '@/widgets/reportsContent/mobile/ui/mobileReportBody';

type TCompactDealsStageCardProps = {
    items: TDealsStageReportRow[];
    emptyText: string;
    isLoading: boolean;
};

const CARD_TONE: Record<string, string> = {
    new: Styles['reportsContent__card--blue'],
    cancelled: Styles['reportsContent__card--yellow'],
};

const LABEL_TONE: Record<string, string> = {
    new: Styles['reportsContent__stageLabel--default'],
    cancelled: Styles['reportsContent__stageLabel--warning'],
};

/**
 * Отображает компактные карточки этапов сделок.
 * @param props Свойства списка этапов сделок.
 */
export const CompactDealsStageCards = ({items, emptyText, isLoading}: TCompactDealsStageCardProps) => {
    const visibleItems = [...items]
        .filter((row) => SALES_STAGE_ORDER.includes(row.stage))
        .sort((a, b) => SALES_STAGE_ORDER.indexOf(a.stage) - SALES_STAGE_ORDER.indexOf(b.stage));

    return (
        <MobileReportBody emptyText={emptyText} isEmpty={visibleItems.length === 0} isLoading={isLoading}>
            <div className={Styles.reportsContent__cards}>
                {visibleItems.map((row) => (
                    <article
                        key={row.stage}
                        className={`${Styles.reportsContent__card} ${CARD_TONE[row.stage] ?? Styles['reportsContent__card--default']}`}
                    >
                        <div className={Styles.reportsContent__stageRow}>
                            <span
                                className={`${Styles.reportsContent__stageLabel} ${LABEL_TONE[row.stage] ?? Styles['reportsContent__stageLabel--accent']}`}
                            >
                                {DEAL_STATUS_LABELS[row.stage] ?? row.stage}
                            </span>
                            <span className={Styles.reportsContent__stageAmount}>
                                {formatAmount(row.totalAmount)} сумма
                            </span>
                            <span className={Styles.reportsContent__stageCount}>{row.dealsCount} сделок</span>
                        </div>
                    </article>
                ))}
            </div>
        </MobileReportBody>
    );
};
