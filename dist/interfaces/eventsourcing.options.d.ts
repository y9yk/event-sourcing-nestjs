export interface EventSourcingOptions {
    mongoURL: string;
}
export interface EventSourcingAsyncOptions {
    useFactory: (...args: any[]) => Promise<EventSourcingOptions> | EventSourcingOptions;
    inject?: any[];
}
