import { FunctionOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import { forwardRef, useState } from "react";

interface ExpressionInputProps {
    expression: string;
    setExpression: (value: string) => void;
    inputRef: React.RefObject<TextAreaRef>;
}

const ExpressionInput = forwardRef<HTMLTextAreaElement, ExpressionInputProps>(({ expression, setExpression, inputRef }) => {
    const [openSave, setOpenSave] = useState(false);
    const handleAddToReocd = () => {

    };
    const [form] = Form.useForm();
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                计算表达式
            </label>
            <Input.TextArea
                ref={inputRef}
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="请输入数学表达式，例如：2 + 2 * 3"
                className="w-full p-4 text-lg border-gray-300 rounded-lg font-mono"
                rows={3}
                autoSize={{ minRows: 3, maxRows: 6 }}
                allowClear
            />
            <div className="flex justify-end mt-2">
                <Flex gap="small" wrap>
                    <Button icon={<FunctionOutlined />} type="primary">计算</Button>
                    <Button
                        icon={<AppstoreAddOutlined />}
                        type="primary"
                        onClick={() => setOpenSave(true)}
                    >收藏表达式</Button>
                </Flex>
            </div>
            <Modal
                title="保存表达式"
                open={openSave}
                onOk={handleAddToReocd}
                onCancel={() => setOpenSave(false)}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 5}}
                    wrapperCol={{ span: 19 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="表达式名称"
                        name="expressionName"
                        rules={[{ required: true, message: '请填写表达式名称' }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
});

export default ExpressionInput;
