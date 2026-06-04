import {Preloader} from "@/shared/ui/preloader";
import {useIsMobile} from "@/shared/lib/hooks";
import Styles from './MenuLoader.module.css';

export const MenuLoader = () => {
    const isMobile = useIsMobile();

    return (
        <div className={`${isMobile ? Styles.mobileLoader : Styles.desktopLoader}`}>
            <Preloader/>
        </div>
    )
}