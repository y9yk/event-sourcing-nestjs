import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from './metadata';
import { EventStore } from './eventstore';
export declare class AggregateRepository {
    private readonly eventStore;
    constructor(eventStore: EventStore);
    getById<T extends AggregateRoot>(type: Type<T>, aggregateName: string, aggregateId: string): Promise<T | null>;
}
