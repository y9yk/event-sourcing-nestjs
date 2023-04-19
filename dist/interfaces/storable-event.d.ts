import { IEvent } from '@nestjs/cqrs/dist/interfaces';
export declare abstract class StorableEvent implements IEvent {
    abstract id: string;
    abstract eventAggregate: string;
    abstract eventVersion: number;
    eventName: string;
    constructor();
}
