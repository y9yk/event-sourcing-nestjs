import { ViewUpdater } from './view';
import { ViewEventBus } from './view';
import { StoreEventBus } from './store-event-bus';
import { StoreEventPublisher } from './store-event-publisher';
import { AggregateRepository } from './aggregate-repository';
export declare function createEventSourcingProviders(): (typeof AggregateRepository | typeof ViewUpdater | typeof ViewEventBus | typeof StoreEventBus | typeof StoreEventPublisher)[];
