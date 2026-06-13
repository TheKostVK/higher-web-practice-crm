import {type TClientListRow, useDeleteClientMutation} from '@/entities/client';
import {Button, Popconfirm} from 'antd';

export const ActionsCell = ({record}: {record: TClientListRow}) => {
    const [deleteClient] = useDeleteClientMutation();

    const handleDelete = async (event?: React.MouseEvent) => {
        event?.stopPropagation();
        await deleteClient(record.id);
    };

    return (
        <Popconfirm
            title="Удалить клиента?"
            description="Клиент будет помечен как удалённый."
            okText="Удалить"
            cancelText="Отмена"
            onConfirm={handleDelete}
            onPopupClick={(e) => e.stopPropagation()}
        >
            <Button type="text" size="small" danger onClick={(e) => e.stopPropagation()}>
                Удалить
            </Button>
        </Popconfirm>
    );
};
