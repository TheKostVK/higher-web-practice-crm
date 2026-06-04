import {lazy, Suspense} from "react";

import {useIsMobile} from "@/shared/lib/hooks";

import {appSidebarContentItems} from "./constant";
import {AppMenuProvider} from "./context";
import {List} from "./ui/list";
import {MenuLoader} from "@/widgets/appSidebar/ui/menuLoader";

const SideMenu = lazy(() =>
    import("./desktop/ui/sideMenu").then(({SideMenu}) => ({
        default: SideMenu,
    }))
);

const HeaderMenu = lazy(() =>
    import("./mobile/ui/headerMenu").then(({HeaderMenu}) => ({
        default: HeaderMenu,
    }))
);

export const AppSidebar = () => {
    const isMobile = useIsMobile();

    const menuContent = <List items={appSidebarContentItems}/>;

    return (
        <AppMenuProvider>
            <Suspense fallback={<MenuLoader/>}>
                {isMobile ? (
                    <HeaderMenu>{menuContent}</HeaderMenu>
                ) : (
                    <SideMenu>{menuContent}</SideMenu>
                )}
            </Suspense>
        </AppMenuProvider>
    );
};