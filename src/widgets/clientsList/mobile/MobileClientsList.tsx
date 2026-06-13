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
                        <div className={Styles.mobileClients__card_header}>
                            <p className={Styles.mobileClients__card_name}>{client.deleted ?
                                <s>{client.name}</s> : client.name}</p>
                            <span
                                className={Styles.mobileClients__card_date}>{formatDate(client.createdAt, 'long')}</span>
                        </div>

                        <div className={Styles.mobileClients__card_content}>
                            <p className={Styles.mobileClients__card_phone}>{client.phone}</p>
                            <p className={Styles.mobileClients__card_company}>{client.company}</p>
                            <p className={Styles.mobileClients__card_email}>{client.email}</p>
                            <p className={Styles.mobileClients__card_website}>{client.website}</p>
                        </div>

                        {client.comment && <p className={Styles.mobileClients__card_comment}>{client.comment}</p>}
                    </div>
                ))}
            </div>

            <Button className={Styles.mobileClients__addButton} type="primary" onClick={handleAddClick}>
                Новый клиент
            </Button>
        </MainSection>
    );
};
