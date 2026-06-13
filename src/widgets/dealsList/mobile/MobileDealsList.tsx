import {useState} from 'react';
import {Button, Input} from 'antd';

import {DEAL_STATUS_LABELS, useGetDealsQuery} from '@/entities/deal';
import type {TDealListRow, TDealStatus} from '@/entities/deal';
import {formatAmount, formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

import Styles from './mobile.module.css';
import {MainSection} from "@/shared/ui/mainSection";

const DEAL_STATUS_CLASS_NAMES: Record<TDealStatus, string> = {
    new: Styles.mobileDeals__card_blue,
    in_progress: Styles.mobileDeals__card_green,
    completed: Styles.mobileDeals__card_white,
    cancelled: Styles.mobileDeals__card_orange,
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

    const handleAddClick = () => {
        openDealModal('deals');
    };

    return (
        <MainSection>
            <Input
                className={Styles.mobileDeals__search}
                placeholder="Искать"
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Искать сделку"
                disabled={isFetching}
                prefix={<span className={Styles.mobileDeals__search_icon} aria-hidden="true"/>}
            />
            {isError && <ApiErrorMessage message="Не удалось загрузить список сделок." />}

            <div className={Styles.mobileDeals__list}>
                {deals.map((deal) => (
                    <div
                        key={deal.id}
                        className={`${Styles.mobileDeals__card} ${DEAL_STATUS_CLASS_NAMES[deal.status as TDealStatus]}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCardClick(deal)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick(deal)}
                    >
                        <div className={Styles.mobileDeals__card_row}>
                            <p className={Styles.mobileDeals__card_title}>{deal.title}</p>
                            <span className={Styles.mobileDeals__card_status}>
                            {DEAL_STATUS_LABELS[deal.status as TDealStatus]}
                          </span>
                        </div>

                        <div className={Styles.mobileDeals__card_row}>
                            <p className={Styles.mobileDeals__card_client}>{deal.clientName}</p>
                            <span className={Styles.mobileDeals__card_amount}>{formatAmount(deal.amount)}</span>
                        </div>

                        <p className={Styles.mobileDeals__card_description}>{deal.description || '—'}</p>

                        <div className={Styles.mobileDeals__card_footer}>
                            <div className={Styles.mobileDeals__date_block}>
                                <span className={Styles.mobileDeals__date_label}>создана</span>
                                <span className={Styles.mobileDeals__date_value}>{formatDate(deal.createdAt)}</span>
                            </div>

                            <div className={`${Styles.mobileDeals__date_block} ${Styles.mobileDeals__date_block_end}`}>
                                <span className={Styles.mobileDeals__date_label}>завершена</span>
                                <span className={Styles.mobileDeals__date_value}>{formatDate(deal.completedAt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button className={Styles.mobileDeals__addButton} type="primary" onClick={handleAddClick}>
                Новая сделка
            </Button>
        </MainSection>
    );
};
