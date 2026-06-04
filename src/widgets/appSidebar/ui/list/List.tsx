import {ListItem} from "../listItem";
import type {AppSidebarItem} from "@/widgets/appSidebar/types/types";
import Styles from './list.module.css';
import {memo} from "react";

type ListProps = {
    items: AppSidebarItem[],
};

export const List = memo(({ items }: ListProps) => {
    return (
        <div className={Styles.listItems}>
            {items.map((item) => (
                <ListItem key={item.pathname} item={item}/>
            ))}
        </div>
    )
});
