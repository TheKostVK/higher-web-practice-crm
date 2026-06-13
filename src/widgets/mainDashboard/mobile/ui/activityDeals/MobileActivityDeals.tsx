import {useGetTopDealsQuery} from '@/entities/dashboard';
import {DEAL_STATUS_LABELS, type TDealStatus} from '@/entities/deal';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {StatusCard, StatusText, type TStatusCardVariant} from '@/shared/ui/statusCard';

import Styles from './mobileActivityDeals.module.css';
import {MobileTab} from '@/widgets/mainDashboard/mobile/ui/mobileTab';

const DEAL_CARD_VARIANT: Record<TDealStatus, TStatusCardVariant> = {
    new: 'info',
    in_progress: 'default',
    completed: 'success',
    cancelled: 'danger',
};

const DEAL_STATUS_TONE: Record<TDealStatus, TStatusCardVariant> = {
    new: 'default',
    in_progress: 'info',
    completed: 'success',
    cancelled: 'danger',
};

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
                        <StatusCard className={Styles.card} variant={DEAL_CARD_VARIANT[deal.status]}>
                            <p className={Styles.card__title}>{deal.title}</p>
                            <p className={Styles.card__client}>{deal.clientName}</p>
                            <p className={Styles.card__amount}>{formatAmount(deal.amount)}</p>
                            <div className={Styles.card__footer}>
                                <StatusText className={Styles.card__status} tone={DEAL_STATUS_TONE[deal.status]}>
                                    {DEAL_STATUS_LABELS[deal.status]}
                                </StatusText>
                                <span className={Styles.card__date}>{formatDate(deal.createdAt, 'long')}</span>
                            </div>
                        </StatusCard>
                    </li>
                ))}
            </ul>
        </MobileTab>
    );
};
