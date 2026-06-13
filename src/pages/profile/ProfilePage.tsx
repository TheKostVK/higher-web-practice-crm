import {PageTitle} from '@/shared/ui/pageTitle';
import {ProfileForm} from '@/widgets/profileForm';

export const ProfilePage = () => {
  return (
    <>
      <PageTitle title={`Настройка аккаунта`} />
      <ProfileForm />
    </>
  );
};
