import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'main',
  icon: 'dashboard',
  path: 'main',
  children: [{
    name: 'test',
    path: 'test',
  }, {
    name: 'charts',
    path: 'charts',
  }],
}, {
  name: 'user',
  icon: 'dashboard',
  path: 'user',
  authority: 'guest',
  children: [{
    name: 'lists',
    path: 'lists',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
    hideInMenu: true,
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
