import { useState, useEffect, useRef, } from "react";
import { calculateScientific } from '@/utils/compute';
import ExpressionInput from "./components/ExpressionInput";
import OperatorButtons from "./components/OperatorButtons";
import ResultDisplay from "./components/ResultDisplay";
import { TextAreaRef } from "@/types/define";

const Calculator = () => {
    const [result, setResult] = useState<string | number>('');
    const [expression, setExpression] = useState('');
    const inputRef = useRef<TextAreaRef>(null);

    useEffect(() => {
        try {
            setResult(calculateScientific(expression));
        } catch (e) {
            console.error(e);
            setResult("表达式异常")
        }
    }, [expression]);

    const insertAtCursor = (value: string) => {
        const textAreaElement = inputRef.current?.resizableTextArea?.textArea;
        if (!textAreaElement) {
            return;
        }
        const cursorPosition = textAreaElement.selectionStart || 0;
        const newExpression = expression.slice(0, cursorPosition) + value + expression.slice(cursorPosition);
        setExpression(newExpression);
        setTimeout(() => {
            if (inputRef.current) {
                textAreaElement.selectionStart = cursorPosition + value.length;
                textAreaElement.selectionEnd = cursorPosition + value.length;
                inputRef.current.focus();
            }
        }, 0);
    };

    return (
        <>
            <ExpressionInput
                expression={expression}
                setExpression={setExpression}
                inputRef={inputRef}
            />
            <OperatorButtons setExpression={(oper) => insertAtCursor(oper)} />
            <div className="flex justify-end mb-10"></div>
            <ResultDisplay result={result} />
        </>
    );
};

export default Calculator;

