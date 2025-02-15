import * as React from 'react';
import { RouteComponentProps, Route, Link, Switch, Redirect, matchPath } from 'react-router-dom';
import {
    Layout,
    Button,
    AsideNav
} from 'amis';
import { IMainStore } from '../../stores';
import { inject, observer } from 'mobx-react';
import UserInfo from '../../components/UserInfo';
import { mapTree } from 'amis/lib/utils/helper';
import Navigations from '../../stores/Navigations';


let PATH_PREFIX = '/admin';
let ContextPath = '';

// if (process.env.NODE_ENV === 'production') {
//     ContextPath = '/amis-admin'
// }

function navigations2route(pathPrefix = PATH_PREFIX) {
    let routes:Array<JSX.Element> = [];
    Navigations.forEach(root => {
        root.children && mapTree(root.children, (item:any) => {
            if (item.path && item.component) {
                routes.push(
                    <Route 
                        key={routes.length + 1} 
                        path={item.path[0] === '/' ? (ContextPath + item.path) : `${ContextPath}${pathPrefix}/${item.path}`} 
                        component={item.component} 
                        exact
                    />
                )
            } else if (item.path && item.getComponent) {
                routes.push(
                    <Route 
                        key={routes.length + 1} 
                        path={item.path[0] === '/' ? (ContextPath + item.path) : `${ContextPath}${pathPrefix}/${item.path}`} 
                        getComponent={item.getComponent} 
                        exact
                    />
                )
            }
        });
    });
    return routes;
}

function isActive(link: any, location: any) {
    const ret = matchPath(location.pathname, {
        path: link ? link.replace(/\?.*$/, '') : '',
        exact: true,
        strict: true
    });
    return !!ret;
}

export interface AdminProps extends RouteComponentProps<any>  {
    store: IMainStore
}

@inject("store")
@observer
export default class Admin extends React.Component<AdminProps> {
    renderHeader() {
        const store = this.props.store;

        return (
            <div>
                <div className={`a-Layout-brandBar`}>
                    <button
                        onClick={store.toggleOffScreen}
                        className="pull-right visible-xs"
                    >
                        <i className="glyphicon glyphicon-align-justify" />
                    </button>
                    <div className={`a-Layout-brand`}>
                        <i className="fa fa-home" />
                        <span className="hidden-folded m-l-sm">控制面板</span>
                    </div>
                </div>
                <div className={`a-Layout-headerBar`}>
                    <div className="nav navbar-nav hidden-xs">
                        <Button
                            level="link"
                            className="no-shadow navbar-btn"
                            onClick={store.toggleAsideFolded}
                            tooltip="展开或收起侧边栏"
                            placement="bottom"
                            iconOnly
                        >
                            <i className={store.asideFolded ? 'fa fa-indent' : 'fa fa-dedent'} />
                        </Button>
                    </div>

                    <div className="hidden-xs p-t-sm pull-right">
                        <UserInfo user={store.user} />
                    </div>
                </div>
            </div>
        );
    }

    renderAside() {
        const location = this.props.location;
        const store = this.props.store;
        

        return (
            <AsideNav
                key={store.asideFolded ? 'folded-aside' : 'aside'}
                navigations={Navigations}
                renderLink={({link, toggleExpand, classnames: cx, depth}:any) => {

                    if (link.hidden) {
                        return null;
                    }
    
                    let children = [];
    
                    if (link.children) {
                        children.push(
                            <span
                                key="expand-toggle"
                                className={cx('AsideNav-itemArrow')}
                                onClick={(e) => toggleExpand(link, e)}
                            />
                        );
                    }
    
                    link.badge && children.push(
                        <b key="badge" className={cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info')}>{link.badge}</b>
                    );
    
                    if (link.icon) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />
                        )
                    } else if (store.asideFolded && depth === 1) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, link.children ? 'fa fa-folder' : 'fa fa-info')} />
                        )
                    }
    
                    children.push(
                        <span key="label" className={cx('AsideNav-itemLabel')}>{link.label}</span>
                    );
    
                    return link.path
                        ? (link.active ? <a>{children}</a> : <Link to={link.path[0] === '/' ? (ContextPath + link.path) : `${ContextPath}${PATH_PREFIX}/${link.path}`}>{children}</Link>)
                        : (<a onClick={link.onClick ? link.onClick : link.children ? () => toggleExpand(link) : undefined}>{children}</a>);
                }}
                isActive={(link:any) => isActive(link.path && link.path[0] === '/' ? (ContextPath + link.path) : `${ContextPath}${PATH_PREFIX}/${link.path}`, location)}
            />
        );
    }


    render() {
        const store = this.props.store;

        return (
            <Layout
                aside={this.renderAside()}
                header={this.renderHeader()}
                folded={store.asideFolded}
                offScreen={store.offScreen}
            >
                <Switch>
                    <Redirect to={`${ContextPath}${PATH_PREFIX}/dashboard`} from={`${ContextPath}${PATH_PREFIX}/`} exact />
                    {navigations2route()}
                    <Redirect to={`${ContextPath}/404`} />
                </Switch>
            </Layout>
        );
    }
}