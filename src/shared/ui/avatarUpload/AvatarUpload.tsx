import {memo, type ChangeEventHandler} from 'react';
import {ProfileAvatar, type TAvatarSize} from '@/shared/ui/profileAvatar';
import Styles from './avatarUpload.module.css';

type TAvatarUploadProps = {
    src?: string;
    alt: string;
    error?: string;
    size?: TAvatarSize;
    accept?: string;
    ariaLabel?: string;
    className?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

export const AvatarUpload = memo(
    ({
        src,
        alt,
        error,
        size = 'huge',
        accept = 'image/*',
        ariaLabel = 'Загрузить аватар',
        className = '',
        onChange,
    }: TAvatarUploadProps) => {
        return (
            <div className={`${Styles.avatarUpload} ${className}`}>
                <ProfileAvatar src={src} useIcon={!src} size={size} alt={alt} />

                <label className={Styles.avatarUpload__button}>
                    <input
                        className={Styles.avatarUpload__input}
                        type="file"
                        accept={accept}
                        aria-label={ariaLabel}
                        onChange={onChange}
                    />
                    <svg
                        className={Styles.avatarUpload__icon}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M12.7 8.5L11 11H8.5C6.6 11 5 12.6 5 14.5V22C5 23.9 6.6 25.5 8.5 25.5H23.5C25.4 25.5 27 23.9 27 22V14.5C27 12.6 25.4 11 23.5 11H21L19.3 8.5H12.7Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 21.5C18.2 21.5 20 19.7 20 17.5C20 15.3 18.2 13.5 16 13.5C13.8 13.5 12 15.3 12 17.5C12 19.7 13.8 21.5 16 21.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                </label>

                {error && <span className={Styles.avatarUpload__error}>{error}</span>}
            </div>
        );
    },
);
