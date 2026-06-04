import {Outlet} from "react-router-dom";
import {Layout} from "antd";

import {AppSidebar} from "@/widgets/appSidebar";
import {useIsMobile} from "@/shared/lib/hooks";

const {Content} = Layout;

export const MainLayout = () => {
    const isMobile = useIsMobile();

    return (
        <Layout hasSider={!isMobile}>
            <AppSidebar/>
            <Layout>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}
