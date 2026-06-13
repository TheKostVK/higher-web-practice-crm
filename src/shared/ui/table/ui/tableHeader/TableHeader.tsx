import Styles from './tableHeader.module.css';
import {memo} from "react";

type TTableRowProps = {
    data: string[] | undefined;
};

export const TableHeader = memo(({data}: TTableRowProps) => {
    if (!data) {
        return (
            <tr className={Styles.tableRow}>
                <th className={Styles.tableRow__cell} scope="col">Отсутствует информация</th>
            </tr>
        );
    }

    return (
        <tr className={Styles.tableRow}>
            {Object.values(data).map((item) => (
                <th
                    key={item}
                    className={`${Styles.tableRow__cell}`}
                    scope="col"
                >
                    {item}
                </th>
            ))}
        </tr>
    );
});
