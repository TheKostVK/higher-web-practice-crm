import {Preloader} from '@/shared/ui/preloader';
import {useIsMobile} from '@/shared/lib/hooks';
import {HeaderMenuFallback} from '@/widgets/appSidebar/mobile/ui/headerMenuFallback';
import Styles from './MenuLoader.module.css';

export const MenuLoader = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <HeaderMenuFallback />;
  }

  return (
    <div className={Styles.desktopLoader}>
      <Preloader />
    </div>
  );
};
