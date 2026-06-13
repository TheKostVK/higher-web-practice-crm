import {useGetTopClientsQuery} from '@/entities/dashboard';
import {formatDate} from '@/shared/lib/formatters';

import Styles from './mobileTopClients.module.css';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {MobileTab} from '@/widgets/mainDashboard/mobile/ui/mobileTab';
import {StatusCard} from '@/shared/ui/statusCard';

/**
 * Карточный список топ-10 активных клиентов для мобильной версии.
 */
export const MobileTopClients = () => {
    const {data: clients = [], isLoading, isError} = useGetTopClientsQuery();

    const openModal = useOpenModalRoute();

    return (
        <MobileTab
            isLoading={isLoading}
            isError={isError}
            errorMessage="Не удалось загрузить топ клиентов."
            tabTitle={'Топ 10 активных клиентов'}
            buttonText={'Новый клиент'}
            buttonOnClick={() => openModal('clients')}
        >
            <ul className={Styles.list}>
                {clients.map((client) => (
                    <li key={client.id}>
                        <StatusCard className={Styles.card}>
                            <div className={Styles.card__header}>
                                <span className={Styles.card__name}>{client.name}</span>
                                <span className={Styles.card__deals}>{client.dealsCount} сд.</span>
                            </div>
                            <div className={Styles.card__meta}>
                                <span className={Styles.card__secondary}>{client.company}</span>
                                <span className={Styles.card__secondary}>{formatDate(client.createdAt)}</span>
                            </div>
                            <span className={Styles.card__phone}>{client.phone}</span>
                        </StatusCard>
                    </li>
                ))}
            </ul>
        </MobileTab>
    );
};
