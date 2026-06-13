import {useLocation, type Location} from 'react-router-dom';
import {Layout} from 'antd';

import {AppSidebar} from '@/widgets/appSidebar';
import {ModalRouteLayer} from '@/widgets/modalRouteLayer';
import {useIsMobile} from '@/shared/lib/hooks';
import {PageRoutes} from './routes';

import Styles from './mainLayout.module.css';

const {Content} = Layout;

type TMainLayoutState = {
  backgroundLocation?: Location;
};

export const MainLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const state = location.state as TMainLayoutState | null;
  const backgroundLocation = state?.backgroundLocation;
  const contentPathname = backgroundLocation?.pathname ?? location.pathname;

  return (
    <Layout hasSider={!isMobile}>
      <AppSidebar />
      <Layout>
        <Content
          className={`${Styles.content} ${isMobile && contentPathname === '/profile' ? Styles.content_gradient : ''}`}
        >
          <PageRoutes location={backgroundLocation || location} />
          <ModalRouteLayer />
        </Content>
      </Layout>
    </Layout>
  );
};
