import { Layout, Divider, theme } from 'antd';
import SiderMenu from '@/components/menu';
import PageContent from '@/components/page-content';
import { getPageByKey, menus } from '@/setting/menu';
import React, { useState } from 'react';

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [Component, setComponent] = useState<React.ReactNode>();
  const handleMenuItemClick = React.useCallback(async (key: string) => {
    const component = await getPageByKey(key);    
    setComponent(component);
  }, [setComponent])
  const defaultSelectedKey = menus[0]?.key as string;

  React.useEffect(() => {
    handleMenuItemClick(defaultSelectedKey).then()
  }, [handleMenuItemClick, defaultSelectedKey])
  return (
    <Layout
      className='h-full p-4'
      style={{}}
    >
      <SiderMenu onMenuClick={handleMenuItemClick} defaultKey={defaultSelectedKey}/>

      <Layout
        className='flex flex-row'
        style={{
          height: '100%',
          background: colorBgContainer,
          borderTopRightRadius: borderRadiusLG,
          borderBottomRightRadius: borderRadiusLG,
        }}
      >
        <div className='p-3'>
          <Divider type="vertical" className='h-full' ></Divider>
        </div>

        <PageContent
          active={Component}
        ></PageContent>
      </Layout>
    </Layout>
  )
}

export default App
