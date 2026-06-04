import {selectorUserData} from "@/entities/user";
import {useAppSelector} from "@/app";
import {PageTitle} from "@/shared/ui/pageTitle";
import {Container} from "@/shared/ui/container";

export function DashboardPage() {
    const user = useAppSelector(selectorUserData);

    return (
        <>
            <PageTitle title={`Добро пожаловать, ${user ? user.firstName : 'пользователь'}!`} subTitle={'Посмотрите сводную информацию по вашим клиентам, сделкам и задачам'}/>
            <Container>
                Профиль
            </Container>
        </>
    )
}

