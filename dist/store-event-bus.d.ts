import { IEvent, IEventBus } from '@nestjs/cqrs/dist/interfaces';
import { EventStore } from './eventstore';
import { ViewEventBus } from './view/view-event-bus';
export declare class StoreEventBus implements IEventBus {
    private readonly eventBus;
    private readonly eventStore;
    constructor(eventBus: ViewEventBus, eventStore: EventStore);
    publish<T extends IEvent>(event: T): void;
    publishAll(events: IEvent[]): void;
}
