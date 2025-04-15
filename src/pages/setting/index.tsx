import { SettingOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Skeleton } from "antd";
import { useState } from "react";

const SettingPage = () => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div>
                <div className="flex justify-between">
                    <div className="flex items-end">
                        <Breadcrumb items={[
                            { title: <SettingOutlined />, },
                            { title: "设置" }
                        ]}></Breadcrumb>
                    </div>
                </div>
                <Divider className="mt-2 mb-5"></Divider>
                <Skeleton active loading={loading}>

                </Skeleton>

            </div>
        </>
    );
}

export default SettingPage;