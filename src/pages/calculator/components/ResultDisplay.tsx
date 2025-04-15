import { CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { message } from "antd";

interface ResultDisplayProps {
    result: string | number;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
    const copyResult = () => {
        const text = (result || '').toString();
        navigator.clipboard.writeText(text);
        message.success('计算结果已复制到剪贴板');
    };
    return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg shadow ">
           <div className="transform transition-all duration-300 hover:scale-[1.02]">
           <div className="flex justify-between items-center mb-4">
                <span className="text-gray-800 font-medium text-xl">计算结果</span>
                <Button
                    icon={<CopyOutlined />}
                    onClick={copyResult}
                    className="!rounded-button whitespace-nowrap bg-blue-50 text-blue-600 hover:bg-blue-100 border-none"
                >
                    复制结果
                </Button>
            </div>
            <div className="text-5xl font-bold text-gray-800 mt-4 tracking-wider break-all">
                {result}
            </div>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-200 rounded-full animate-pulse"></div>
            </div>
           </div>
           
        </div>
    );
};

export default ResultDisplay;