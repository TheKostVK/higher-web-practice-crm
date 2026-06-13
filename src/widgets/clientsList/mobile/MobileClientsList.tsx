import {useState} from 'react';
import {Button, Input} from 'antd';

import {useGetClientsQuery} from '@/entities/client';
import type {TClientListRow} from '@/entities/client';
import {formatDate} from '@/shared/lib/formatters';
import {useOpenModalRoute} from '@/shared/lib/modalRoute';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

import Styles from './mobile.module.css';
import {MainSection} from "@/shared/ui/mainSection";

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

    const handleAddClick = () => {
        openClientModal('clients');
    };

    return (
        <MainSection>
            <div className={Styles.mobileClients__toolbar}>
                <Input
                    className={Styles.mobileClients__search}
                    placeholder="Искать"
                    prefix={<span className={Styles.mobileClients__searchIcon} aria-hidden="true"/>}
                    allowClear
                    value={search}
                    disabled={isFetching}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {isError && <ApiErrorMessage message="Не удалось загрузить список клиентов." />}

            <div className={Styles.mobileClients__list}>
                {clients.map((client) => (
                    <div
                        key={client.id}
                        className={`${Styles.mobileClients__card} ${client.deleted ? Styles['mobileClients__card--deleted'] : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCardClick(client)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCardClick(client)}
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
            </div>

            <Button className={Styles.mobileClients__addButton} type="primary" onClick={handleAddClick}>
                Новый клиент
            </Button>
        </MainSection>
    );
};
