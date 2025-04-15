import { ItemType } from "antd/es/menu/interface";
import {
    CalculatorOutlined,
    PicLeftOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import React, { Suspense } from "react";
import { DefineImportComponent } from "@/types/define";

export type MenuItem = ItemType & { component: DefineImportComponent }
export const menus: MenuItem[] = [
    {
        key: 'calculator',
        label: '表达式',
        icon: <CalculatorOutlined className="text-xl" />,
        component: () => import('@/pages/calculator'),
    },
    {
        key: 'record',
        label: '我的收藏',
        icon: <PicLeftOutlined className="text-xl" />,
        component: () => import('@/pages/record'),
    },
    {
        key: 'setting',
        label: '设置',
        icon: <SettingOutlined className="text-xl" />,
        component: () => import('@/pages/setting'),
    },
]

export async function getPageByKey(key: string) {
    const current = menus.find((item) => item.key === key);

    if (!current) {
        return <Suspense fallback={<div>加载异常</div>}></Suspense>;
    }

    const loadComponent = current.component;
    const component = await loadComponent();
    return (
        <Suspense fallback={<div>加载中...</div>}>
            {React.createElement(component.default)}
        </Suspense>
    );
}