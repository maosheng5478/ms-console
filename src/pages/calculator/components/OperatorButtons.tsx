import { Button } from "antd";

interface OperatorButtonsProps {
    setExpression: (value: string) => void;
}

const OperatorButtons = ({ setExpression }: OperatorButtonsProps) => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">常用运算符</h3>
            <div className="grid grid-cols-4 gap-4">
                {['+', '-', '*', '/', '(', ')', '%', '^'].map((operator) => (
                    <Button
                        key={operator}
                        onClick={() => setExpression(operator)}
                        className="!rounded-button whitespace-nowrap"
                    >
                        {operator}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default OperatorButtons;