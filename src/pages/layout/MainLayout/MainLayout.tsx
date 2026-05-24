import {Outlet} from "react-router-dom";
import {Layout} from "antd";

import {MainHeader} from "../../../shared/ui/mainHeader";
import {AppSidebar} from "../../../widgets/appSidebar";

const {Content} = Layout;

export const MainLayout = () => {
    return (
        <Layout hasSider>
            <AppSidebar/>
            <Layout>
                <MainHeader/>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}
