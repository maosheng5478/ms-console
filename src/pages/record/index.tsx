import { CalculatorRecord } from "@/types/define";
import { invoke } from "@tauri-apps/api";
import { useState, useEffect } from "react";
import { Card, Button, Breadcrumb, Input, Divider, Skeleton, GetProps, Space } from "antd";
import dayjs from "dayjs";
import { defJson } from "@/utils";
import { PicLeftOutlined } from "@ant-design/icons";
import EditRecord from "./EditRecord";

type SearchProps = GetProps<typeof Input.Search>;

const RecordPage = () => {
  const { Search } = Input;
  const [listData, setListData] = useState<CalculatorRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<CalculatorRecord>({} as CalculatorRecord);
  const readConent = async () => {
    const content = await invoke<string>("read_json_file");
    console.log(typeof content);

    setListData(defJson<CalculatorRecord[]>(content, []));
  };
  const handleSearch: SearchProps["onSearch"] = (value) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const write = async (data: CalculatorRecord) => {
    await invoke("write_json_file", { content: JSON.stringify(data) });
  };

  const handleUpadteRecord = async (data: CalculatorRecord) => {
    try {
      await invoke("update_json_file", {
        id: data.id,
        newData: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    readConent();
    return true;
  };
  const handleEdit = (record: CalculatorRecord) => {
    setCurrentRecord(record);
    setOpen(true);
  };
  useEffect(() => {
    readConent();
  }, []);
  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex items-end">
            <Breadcrumb items={[
              { title: <PicLeftOutlined />, },
              { title: "收藏" }
            ]}></Breadcrumb>
          </div>
          <div>
            <Search placeholder="请输入关键字查找" onSearch={handleSearch}></Search>
          </div>
        </div>
        <Divider className="mt-2 mb-5"></Divider>
        <Skeleton active loading={loading}>
          {listData.map((item, index) => (
            <Card
              key={item.id + "" + index}
              className="mb-3"
              title={item.name}
              extra={
                <Space>
                  <Button size="small" type="link" onClick={() => handleEdit(item)}>
                    编辑
                  </Button>
                  <Button danger size="small" type="text">
                    刪除
                  </Button>
                </Space>
              }
              size="small"
            >
              <div className="flex justify-between">
                <div>{item.calculator}</div>
                <div>{dayjs(item.createTime).format("YYYY-MM-DD HH:mm")}</div>
              </div>
            </Card>
          ))}
        </Skeleton>
        <EditRecord
          data={currentRecord}
          open={open}
          close={() => setOpen(false)}
          updateRecord={handleUpadteRecord}
        ></EditRecord>
      </div>
    </>
  );
};

export default RecordPage;
