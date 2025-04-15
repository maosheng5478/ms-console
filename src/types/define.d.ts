import { GetRef, Input } from 'antd';
import { Dayjs } from 'dayjs';
import React from 'react';

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type TextAreaRef = GetRef<typeof Input.TextArea>;

declare type SearchRef = GetRef<typeof Input.Search>;

declare type TimeType = string | Date | Dayjs;

declare interface CalculatorRecord {
  id: string;
  name: string;
  createTime: TimeType;
  updateTime: TimeType;
  calculator: string;
}

declare interface DefineComponentFile {
  default: (() => React.ReactNode) | React.ClassType;
}

declare type DefineImportComponent = () => Promise<DefineComponentFile>