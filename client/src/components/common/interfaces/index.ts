export interface Irecord {
    result?: string,
    table?: number,
    _start?: string,
    _stop?: string,
    _time?: string,
    _value?: number,
    _field?: string,
    _measurement?: string,
    dataSet: string,
    name?: string
}

export interface Iprops {
    [propName: string]: any;
  }

export interface Imetric {
    name: string;
    value: string;
  }

export interface Ierror {
  isError?: boolean;
  error?: any;
}