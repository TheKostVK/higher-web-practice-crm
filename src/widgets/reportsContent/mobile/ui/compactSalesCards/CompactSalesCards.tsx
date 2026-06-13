import Styles from "@/widgets/reportsContent/reportsContent.module.css";
import {formatAmount, formatDate} from "@/shared/lib/formatters";
import type {TSalesReportRow} from "@/entities/reports";
import {SALES_CARD_PLACEHOLDER_ID} from "@/widgets/reportsContent/model";
import {MobileReportBody} from "@/widgets/reportsContent/mobile/ui/mobileReportBody";

type TCompactSalesCardProps = {
    items: TSalesReportRow[];
    emptyText: string;
    isLoading: boolean;
};

/**
 * Отображает компактные карточки продаж.
 * @param props Свойства списка продаж.
 */
export const CompactSalesCards = ({items, emptyText, isLoading}: TCompactSalesCardProps) => {
    const visibleItems = [...items].sort(
        (left, right) => right.amount - left.amount || new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime(),
    );

    return (
        <MobileReportBody emptyText={emptyText} isEmpty={visibleItems.length === 0} isLoading={isLoading}>
            <div className={Styles.reportsContent__cards}>
                {visibleItems.map((row) => (
                    <article key={row.dealId} className={Styles.reportsContent__card}>
                        <div className={Styles.reportsContent__salesRow}>
                              <span
                                  className={`${Styles.reportsContent__salesCell} ${Styles['reportsContent__salesCell--id']}`}>
                                {SALES_CARD_PLACEHOLDER_ID(row.dealId)}
                              </span>
                            <span className={Styles.reportsContent__salesCell}>{row.clientName}</span>
                            <span className={Styles.reportsContent__salesCell}>{row.title}</span>
                        </div>
                        <div className={Styles.reportsContent__salesFooter}>
                            <strong className={Styles.reportsContent__salesAmount}>{formatAmount(row.amount)}</strong>
                            <span className={Styles.reportsContent__salesDate}>{formatDate(row.completedAt)}</span>
                        </div>
                    </article>
                ))}
            </div>
        </MobileReportBody>
    );
};
