import {useGetTopDealsQuery, type TDashboardTopDeal} from '@/entities/dashboard';
import {DEAL_STATUS_LABELS, type TDealStatus} from '@/entities/deal';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';

import Styles from './mobileActivityDeals.module.css';
import {MobileTab} from "@/widgets/mainDashboard/mobile/ui/mobileTab";
import {Card} from "@/shared/ui/card";

const DEAL_CARD_CLASS: Record<TDealStatus, string> = {
    new: Styles['card--new'],
    in_progress: '',
    completed: '',
    cancelled: '',
};

const getCardClassName = (deal: TDashboardTopDeal): string =>
    [Styles.card, DEAL_CARD_CLASS[deal.status]].filter(Boolean).join(' ');

const getStatusClassName = (deal: TDashboardTopDeal): string =>
    [Styles.card__status, Styles[`card__status--${deal.status}`]].filter(Boolean).join(' ');

/**
 * Карточный список топ-10 активных сделок для мобильной версии.
 */
export const MobileActivityDeals = () => {
    const {data: deals = [], isLoading, isError} = useGetTopDealsQuery();
    const openModal = useOpenModalRoute();

    return (
        <MobileTab
            isLoading={isLoading}
            isError={isError}
            errorMessage="Не удалось загрузить топ сделок."
            tabTitle={'Топ 10 активных сделок'}
            buttonText={'Новая сделка'}
            buttonOnClick={() => openModal('deals')}
        >
            <ul className={Styles.list}>
                {deals.map((deal) => (
                    <li key={deal.id}>
                        <Card className={getCardClassName(deal)}>
                            <p className={Styles.card__title}>{deal.title}</p>
                            <p className={Styles.card__client}>{deal.clientName}</p>
                            <p className={Styles.card__amount}>{formatAmount(deal.amount)}</p>
                            <div className={Styles.card__footer}>
                                    <span className={getStatusClassName(deal)}>
                                      {DEAL_STATUS_LABELS[deal.status]}
                                    </span>
                                <span className={Styles.card__date}>{formatDate(deal.createdAt, 'long')}</span>
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
        </MobileTab>
    );
};
