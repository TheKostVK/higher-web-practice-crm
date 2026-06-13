import {Button, Skeleton} from 'antd';

import {useGetTopClientsQuery} from '@/entities/dashboard';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {BlockTitle} from '@/widgets/mainDashboard/desktop/ui/blockTitle';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {StatusCard} from '@/shared/ui/statusCard';

import Styles from './topClients.module.css';

/**
 * Карточная сетка топ-10 активных клиентов по количеству сделок.
 */
export const TopClients = () => {
    const {data: clients = [], isLoading, isError} = useGetTopClientsQuery();
    const openModal = useOpenModalRoute();

    return (
        <div className={Styles.section}>
            <div className={Styles.content}>
                <BlockTitle title="Топ 10 активных клиентов"/>
                {isLoading ? (
                    <Skeleton active/>
                ) : isError ? (
                    <ApiErrorMessage message="Не удалось загрузить топ клиентов." />
                ) : (
                    <ul className={Styles.grid}>
                        {clients.map((client) => (
                            <li key={client.id}>
                                <StatusCard className={Styles.card}>
                                    <div className={Styles.card__info}>
                                        <span className={Styles.card__name}>{client.name}</span>
                                        <span className={Styles.card__company}>«{client.company}»</span>
                                    </div>
                                    <div className={Styles.card__deals}>
                                        <span className={Styles.card__dealsCount}>{client.dealsCount}</span>
                                        <span className={Styles.card__dealsLabel}>сделок</span>
                                    </div>
                                </StatusCard>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Button type="primary" onClick={() => openModal('clients')}>
                Новый клиент
            </Button>
        </div>
    );
};
