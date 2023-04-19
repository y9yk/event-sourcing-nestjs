import { StorableEvent } from './interfaces/storable-event';
export declare class EventStore {
    private readonly eventstore;
    private eventStoreLaunched;
    constructor(mongoURL: string);
    isInitiated(): boolean;
    getEvents(aggregate: string, id: string): Promise<StorableEvent[]>;
    getEvent(index: number): Promise<StorableEvent>;
    storeEvent<T extends StorableEvent>(event: T): Promise<void>;
    private getStorableEventFromPayload;
    private getAgrregateId;
}
