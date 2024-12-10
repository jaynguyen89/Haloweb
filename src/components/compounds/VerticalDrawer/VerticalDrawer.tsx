import React from 'react';
import { useNavigate } from 'react-router-dom';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles from 'src/components/compounds/VerticalDrawer/styles';
import { TVerticalDrawerMenu, TVerticalDrawerMenuItem } from 'src/components/compounds/VerticalDrawer/utilities';

type TVerticalDrawerProps = {
    style?: React.CSSProperties,
    menuItems: Array<TVerticalDrawerMenu>,
};

const VerticalDrawer = ({
    style,
    menuItems,
}: TVerticalDrawerProps) => {
    const styles = useStyles();
    const navigate = useNavigate();

    const renderMenuItem = (key: number | string, item: TVerticalDrawerMenuItem) => {
        const { isActive = false, text, icon, link = '/', onClick, subMenu } = item || {};

        const go = () => navigate(link);

        return (
            <div
                key={key}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={onClick ?? go}
            >
                {text}
                {icon && <FaIcon wrapper='fa' t='obj' ic={icon}/>}
                {subMenu && subMenu.map((subMenuItem, i) => renderMenuItem(i, subMenuItem))}
            </div>
        );
    };

    const renderMenu = (key: number | string, menuItem: TVerticalDrawerMenu) => {
        const { title, items, divider } = menuItem;

        return (
            <div key={key}>
                <h5>{title}</h5>
                {items.map((item, i) => renderMenuItem(i, item))}
                {divider && <div className='divider' />}
            </div>
        );
    };

    return (
        <div
            className={styles.verticalDrawer}
            style={style}
        >
            {menuItems.map((menuItem, i) => renderMenu(i, menuItem))}
        </div>
    );
};

export default VerticalDrawer;
