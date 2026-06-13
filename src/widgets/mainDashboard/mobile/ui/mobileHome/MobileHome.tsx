import {useOpenModalRoute} from "@/shared/lib/modalRoute";
import {Button} from "antd";
import {SummaryInfo} from "@/widgets/mainDashboard/mobile/ui/summaryInfo";

import Styles from './mobileHome.module.css';

export const MobileHome = () => {
    const openModal = useOpenModalRoute();

    return (
        <div className={Styles.homeTab}>
            <div className={Styles.quickActions}>
                <Button type="primary" size="small" onClick={() => openModal('clients')}>
                    + Клиент
                </Button>
                <Button type="primary" size="small" onClick={() => openModal('deals')}>
                    + Сделка
                </Button>
                <Button type="primary" size="small" onClick={() => openModal('tasks')}>
                    + Задача
                </Button>
            </div>
            <SummaryInfo/>
        </div>
    );
};
