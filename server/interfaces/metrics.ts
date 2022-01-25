export interface Imetric {
name: string;
value: number;
timeStamp: number;
}

export interface Iquery {
    start?: string;
    interval?: string;
    avg?: number;
}

export interface Iresponse {
    isError: boolean;
    payload: any;
}
