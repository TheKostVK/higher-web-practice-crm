import {selectorUserData} from '@/entities/user';
import {useAppSelector} from '@/app';
import {PageTitle} from '@/shared/ui/pageTitle';
import {MainDashboard} from '@/widgets/mainDashboard';
import {MainSection} from '@/shared/ui/mainSection';

export function DashboardPage() {
    const user = useAppSelector(selectorUserData);

    return (
        <MainSection>
            <PageTitle
                title={`Добро пожаловать, ${user ? user.firstName : 'пользователь'}!`}
                subTitle={'Посмотрите сводную информацию по вашим клиентам, сделкам и задачам'}
            />
            <MainDashboard />
        </MainSection>
    );
}
