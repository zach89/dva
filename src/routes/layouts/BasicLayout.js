import React from 'react';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { Layout } from 'antd';

import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
// 页面生成
import { getMenuData } from '@/common/menu';
import { getRoutes } from '@/utils/utils';
import Authorized from '@/utils/Authorized';
import logo from '@/assets/logo.svg';

import SiderMenu from './SiderMenu/index';
import NotFound from '../Exception/404';
import style from './BasicLayout.less';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;

// function BasicLayout() {
//   return (
//     <div className="latouy">{children}</div>
//   );
// }
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        form: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);
// console.log(redirectData);
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design Pro`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(item =>
        check(routerData[item].authority, item) && item !== '/');
      return authorizedPath;
    }
    return redirect;
  }
  render() {
    const {
      currentUser, routerData, match, location, collapsed,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout className={style.layout}>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header>
            currentUser: {currentUser}
            isMobile: {this.state.isMobile}
          </Header>
          <Content className={style.main}>
            <Switch>
              {/* {
                redirectData.map((item) => {
                  return (<Redirect key={item} exact from={item.from} to={item.to} />);
                }
                )
              } */}
              {
                getRoutes(match.path, routerData).map(item =>
                  (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/exception/403"
                    />
                  )
                )
              }
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer className={style.footer}>
            footer
          </Footer>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(() => ({
  // currentUser: user.currentUser,
  // collapsed: global.collapsed,
  // fetchingNotices: loading.effects['global/fetchNotices'],
  // notices: global.notices,
}))(BasicLayout);
