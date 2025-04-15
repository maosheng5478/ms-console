import { Menu, MenuProps, Layout, theme } from "antd";
import React from "react";
import { SIDER_MENU_LENGTH } from '@/setting';
import { menus } from "@/setting/menu";
import { Fn } from '@/types/define';

interface IProps {
    onMenuClick: Fn<string, any>;
    defaultKey: string;
}

const SiderMenu: React.FC<IProps> = ({ onMenuClick, defaultKey }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleMenuItemClick: MenuProps['onClick'] = ({ key }) => {
        onMenuClick(key);
    }
    return (
        <>
            <Layout.Sider
                width={SIDER_MENU_LENGTH}
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[defaultKey]}
                    className={'text-xs !border-e-0'}
                    inlineIndent={16}
                    style={{
                        height: '100%',
                        borderTopLeftRadius: borderRadiusLG,
                        borderBottomLeftRadius: borderRadiusLG,
                    }}
                    items={menus}
                    onClick={handleMenuItemClick}
                />
            </Layout.Sider>
        </>
    )
}

export default SiderMenu;