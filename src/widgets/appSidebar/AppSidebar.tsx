import {SideMenu} from "./ui/sideMenu";
import {List} from "./ui/list";
import {ProfileSidebar} from "./ui/profileSidebar";
import {appSidebarContentItems} from "./constant";
import {AppSidebarProvider} from "./context";

export const AppSidebar = () => {
    return (
        <AppSidebarProvider>
            <SideMenu children={<List items={appSidebarContentItems}/>} footerChildren={<ProfileSidebar/>}/>
        </AppSidebarProvider>
    )
};
