import { Layout } from 'antd';
import React, { ReactNode } from 'react';

const PageConent: React.FC<{ active?: ReactNode }> = ({ active }) => {
    return (
        <>
            <Layout.Content
                className='py-[24px] flex pr-[5px]'
                style={{
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <div className=" flex-1 overflow-y-auto  pr-[10px]">
                    {active}
                </div>

            </Layout.Content>
        </>
    );

}


export default PageConent;