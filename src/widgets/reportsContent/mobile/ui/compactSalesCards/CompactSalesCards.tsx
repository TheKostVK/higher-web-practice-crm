import Styles from "@/widgets/reportsContent/reportsContent.module.css";
import {formatAmount, formatDate} from "@/shared/lib/formatters";
import type {TSalesReportRow} from "@/entities/reports";
import {SALES_CARD_PLACEHOLDER_ID} from "@/widgets/reportsContent/model";
import {Skeleton} from "antd";

type TCompactSalesCardProps = {
    items: TSalesReportRow[];
    emptyText: string;
    isLoading: boolean;
};

export const CompactSalesCards = ({items, emptyText, isLoading}: TCompactSalesCardProps) => {
    if (items.length === 0) {
        return <div className={Styles.reportsContent__empty}>{emptyText}</div>;
    }

    return (
        <div className={Styles.reportsContent__cards}>
            {isLoading ? <Skeleton active paragraph={{rows: 3}} title={false}/> :
                [...items]
                    .sort((left, right) => right.amount - left.amount || new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime())
                    .map((row) => (
                        <article key={row.dealId} className={Styles.reportsContent__card}>
                            <div className={Styles.reportsContent__salesRow}>
                              <span
                                  className={`${Styles.reportsContent__salesCell} ${Styles.reportsContent__salesCell_id}`}>
                                {SALES_CARD_PLACEHOLDER_ID(row.dealId)}
                              </span>
                                <span className={Styles.reportsContent__salesCell}>{row.clientName}</span>
                                <span className={Styles.reportsContent__salesCell}>{row.title}</span>
                            </div>
                            <div className={Styles.reportsContent__salesFooter}>
                                <strong
                                    className={Styles.reportsContent__salesAmount}>{formatAmount(row.amount)}</strong>
                                <span className={Styles.reportsContent__salesDate}>{formatDate(row.completedAt)}</span>
                            </div>
                        </article>
                    ))}
        </div>
    );
};