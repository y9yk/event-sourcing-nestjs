import { Module, DynamicModule, Scope } from '@nestjs/common';
import { EventSourcingAsyncOptions, EventSourcingOptions } from './interfaces';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStore } from './eventstore';
import { createEventSourcingProviders } from './eventsourcing.providers';
import { EVENT_SOURCING_OPTIONS } from './constants';

@Module({})
export class EventSourcingModule {
  static forRoot(options: EventSourcingOptions): DynamicModule {
    return {
      module: EventSourcingModule,
      providers: [
        {
          provide: EventStore,
          useValue: new EventStore(options.mongoURL),
        },
      ],
      exports: [EventStore],
      global: true,
    };
  }

  static forRootAsync(options: EventSourcingAsyncOptions): DynamicModule {
    return {
      module: EventSourcingModule,
      providers: [
        {
          provide: EVENT_SOURCING_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: EventStore,
          useFactory: (options: EventSourcingOptions) => {
            return new EventStore(options.mongoURL);
          },
          inject: [EVENT_SOURCING_OPTIONS],
        },
      ],
      exports: [EventStore],
      global: true,
    };
  }

  static forFeature(): DynamicModule {
    const providers = createEventSourcingProviders();
    return {
      module: EventSourcingModule,
      imports: [CqrsModule],
      providers: providers,
      exports: providers,
    };
  }
}
