import { Parser } from 'expr-eval';

const parser = new Parser();
parser.consts['^'] = (a: number, b: number) => Math.pow(a, b);

export function calculateScientific(expression: string) {
  try {
    if(!expression){
      return NaN;
    }
    return parser.evaluate(expression);
  } catch (error) {
    console.error("计算错误:", error);
    return NaN;
  }
}


export default { 
    calculateScientific
}