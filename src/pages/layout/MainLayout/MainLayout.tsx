import {Outlet} from "react-router-dom";
import {Layout} from "antd";

import {AppSidebar} from "@/widgets/appSidebar";
import {useIsMobile} from "@/shared/lib/hooks";

import Styles from './mainLayout.module.css';

const {Content} = Layout;

export const MainLayout = () => {
    const isMobile = useIsMobile();

    return (
        <Layout hasSider={!isMobile}>
            <AppSidebar/>
            <Layout>
                <Content className={Styles.content}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}
