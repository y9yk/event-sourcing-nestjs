import { EventBus } from '@nestjs/cqrs/dist/event-bus';
import { IEvent, IEventBus } from '@nestjs/cqrs/dist/interfaces';
import { ViewUpdater } from './view-updater';
export declare class ViewEventBus implements IEventBus {
    private readonly eventBus;
    private viewUpdater;
    constructor(eventBus: EventBus, viewUpdater: ViewUpdater);
    publish<T extends IEvent>(event: T): void;
    publishAll(events: IEvent[]): void;
}
