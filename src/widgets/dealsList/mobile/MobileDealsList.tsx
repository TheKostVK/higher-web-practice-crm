import {useState} from 'react';

import {DEAL_STATUS_LABELS, useGetDealsQuery} from '@/entities/deal';
import type {TDealListRow, TDealStatus} from '@/entities/deal';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {getCardA11yProps} from '@/shared/lib/helpers';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {MobileListShell} from '@/shared/ui/mobileListShell';
import {StatusCard, StatusText, type TStatusCardVariant} from '@/shared/ui/statusCard';

import Styles from './mobile.module.css';

const DEAL_STATUS_VARIANT: Record<TDealStatus, TStatusCardVariant> = {
    new: 'info',
    in_progress: 'success',
    completed: 'default',
    cancelled: 'warning',
};

/**
 * Мобильный список сделок в виде карточек.
 */
export const MobileDealsList = () => {
    const [search, setSearch] = useState('');
    const openDealModal = useOpenModalRoute();

    const {data: deals = [], isFetching, isError} = useGetDealsQuery({
        search: search || undefined,
    });

    const handleCardClick = (deal: TDealListRow) => {
        openDealModal('deals', deal.id);
    };

    return (
        <MobileListShell
            search={search}
            onSearchChange={setSearch}
            searchAriaLabel="Искать сделку"
            isFetching={isFetching}
            isError={isError}
            errorMessage="Не удалось загрузить список сделок."
            addButtonText="Новая сделка"
            onAddClick={() => openDealModal('deals')}
        >
            {deals.map((deal) => (
                <StatusCard
                    key={deal.id}
                    className={Styles.mobileDeals__card}
                    variant={DEAL_STATUS_VARIANT[deal.status as TDealStatus]}
                    {...getCardA11yProps(() => handleCardClick(deal))}
                >
                    <div className={Styles['mobileDeals__cardRow']}>
                        <p className={Styles['mobileDeals__cardTitle']}>{deal.title}</p>
                        <StatusText
                            className={Styles['mobileDeals__cardStatus']}
                            tone={DEAL_STATUS_VARIANT[deal.status as TDealStatus]}
                        >
                            {DEAL_STATUS_LABELS[deal.status as TDealStatus]}
                        </StatusText>
                    </div>

                    <div className={Styles['mobileDeals__cardRow']}>
                        <p className={Styles['mobileDeals__cardClient']}>{deal.clientName}</p>
                        <span className={Styles['mobileDeals__cardAmount']}>{formatAmount(deal.amount)}</span>
                    </div>

                    <p className={Styles['mobileDeals__cardDescription']}>{deal.description || '—'}</p>

                    <div className={Styles['mobileDeals__cardFooter']}>
                        <div className={Styles['mobileDeals__dateBlock']}>
                            <span className={Styles['mobileDeals__dateLabel']}>создана</span>
                            <span className={Styles['mobileDeals__dateValue']}>{formatDate(deal.createdAt)}</span>
                        </div>

                        <div className={`${Styles['mobileDeals__dateBlock']} ${Styles['mobileDeals__dateBlock--end']}`}>
                            <span className={Styles['mobileDeals__dateLabel']}>завершена</span>
                            <span className={Styles['mobileDeals__dateValue']}>{formatDate(deal.completedAt)}</span>
                        </div>
                    </div>
                </StatusCard>
            ))}
        </MobileListShell>
    );
};
