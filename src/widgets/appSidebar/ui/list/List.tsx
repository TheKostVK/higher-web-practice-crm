import {ListItem} from '../listItem';
import type {TAppSidebarItem} from '@/widgets/appSidebar/types/types';
import Styles from './list.module.css';
import {memo} from 'react';

type TListProps = {
    items: TAppSidebarItem[];
};

export const List = memo(({items}: TListProps) => {
    return (
        <div className={Styles.listItems}>
            {items.map((item) => (
                <ListItem key={item.pathname} item={item} />
            ))}
        </div>
    );
});
