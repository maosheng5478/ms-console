import React, { useState } from 'react';
import { Modal, GetProps, message } from 'antd';
import { CalculatorRecord } from '@/types/define';

type ModalProps = GetProps<typeof Modal>;

interface IProps {
    data: CalculatorRecord,
    open: boolean,
    close: () => void,
    updateRecord: (data: CalculatorRecord) => Promise<boolean>,
}

export const EditRecord: React.FC<IProps> = ({ data, open, close, updateRecord }) => {
    const [formData, setFormData] = useState<CalculatorRecord>(data);
    const handleEdit: ModalProps['onOk'] = async () => {
        const result = await updateRecord(formData);
        if (!result) {
            message.error('更新失败');
            return;
        }
        message.success('更新成功');
        close();
    }
    return (
        <>
            <Modal
                open={open}
                onOk={handleEdit}
                onCancel={close}
                title="编辑"
            >

            </Modal>
        </>
    )
}

export default EditRecord;