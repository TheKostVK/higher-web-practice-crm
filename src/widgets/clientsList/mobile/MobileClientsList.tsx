import {useState} from 'react';

import {useGetClientsQuery} from '@/entities/client';
import type {TClientListRow} from '@/entities/client';
import {formatDate} from '@/shared/lib/formatters';
import {getCardA11yProps} from '@/shared/lib/helpers';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {MobileListShell} from '@/shared/ui/mobileListShell';

import Styles from './mobile.module.css';

/**
 * Мобильный список клиентов в виде карточек.
 */
export const MobileClientsList = () => {
    const [search, setSearch] = useState('');
    const openClientModal = useOpenModalRoute();

    const {data: clients = [], isFetching, isError} = useGetClientsQuery({
        search: search || undefined,
    });

    const handleCardClick = (client: TClientListRow) => {
        openClientModal('clients', client.id);
    };

    return (
        <MobileListShell
            search={search}
            onSearchChange={setSearch}
            searchAriaLabel="Искать клиента"
            isFetching={isFetching}
            isError={isError}
            errorMessage="Не удалось загрузить список клиентов."
            addButtonText="Новый клиент"
            onAddClick={() => openClientModal('clients')}
        >
            {clients.map((client) => (
                <div
                    key={client.id}
                    className={`${Styles.mobileClients__card} ${client.deleted ? Styles['mobileClients__card--deleted'] : ''}`}
                    {...getCardA11yProps(() => handleCardClick(client))}
                >
                    <div className={Styles['mobileClients__cardHeader']}>
                        <p className={Styles['mobileClients__cardName']}>{client.deleted ?
                            <s>{client.name}</s> : client.name}</p>
                        <span
                            className={Styles['mobileClients__cardDate']}>{formatDate(client.createdAt, 'long')}</span>
                    </div>

                    <div className={Styles['mobileClients__cardContent']}>
                        <p className={Styles['mobileClients__cardPhone']}>{client.phone}</p>
                        <p className={Styles['mobileClients__cardCompany']}>{client.company}</p>
                        <p className={Styles['mobileClients__cardEmail']}>{client.email}</p>
                        <p className={Styles['mobileClients__cardWebsite']}>{client.website}</p>
                    </div>

                    {client.comment && <p className={Styles['mobileClients__cardComment']}>{client.comment}</p>}
                </div>
            ))}
        </MobileListShell>
    );
};
