import * as React from "react";

import Dashboard from "../page/admin/Dashboard";
import BasicForm from "../page/admin/form/Basic";
import AdvancedForm from "../page/admin/form/Advanced";
import Wizard from "../page/admin/form/Wizard";
import CustomIndex from "../page/admin/customer";


type NavItem = {
    label: string;
    children?: Array<NavItem>;
    icon?: string;
    path?: string;
    component?: React.ElementType;
    getComponent?: () => Promise<React.ElementType>;
};

const Navigations:Array<NavItem> = [
    {
        label: '导航',
        children: [
            {
                path: 'dashboard',
                label: 'Dashboard',
                icon: 'glyphicon glyphicon-signal',
                component: Dashboard
            },

            {
                label: '表单页面',
                icon: 'glyphicon glyphicon-edit',
                children: [
                    {
                        label: '常规表单',
                        path: 'form/basic',
                        component: BasicForm,
                        children: [
                            {
                                label: '三级目录测试',
                                path: 'form/basic/advanced',
                                component: AdvancedForm
                            }
                        ]
                    },

                    {
                        label: '复杂表单',
                        path: 'form/advanced',
                        component: AdvancedForm
                    },

                    {
                        label: '向导',
                        path: 'form/wizard',
                        component: Wizard
                    }
                ]
            },

            {
                label: '会员管理',
                children: [
                    {
                        label: '列表',
                        path: 'customer/index',
                        component: CustomIndex
                    }
                ]
            }
        ]
    },
    {
        label: '会员管理',
        children:[
            {
                label: '列表',
                path: 'customer/index2',
                component: CustomIndex
            }
        ]
    },
];

export default Navigations;
