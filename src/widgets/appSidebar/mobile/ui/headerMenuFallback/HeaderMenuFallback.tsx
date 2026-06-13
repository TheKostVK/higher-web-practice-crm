import Logo from '../../../assetes/logo/logo.svg';

import Styles from './headerMenuFallback.module.css';

export const HeaderMenuFallback = () => {
    return (
        <div className={Styles.headerMenuFallback}>
            <img className={Styles.headerMenuFallback__logo} src={Logo} alt="YaPlex" />
        </div>
    );
};
