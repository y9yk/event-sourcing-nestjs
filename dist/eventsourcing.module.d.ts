import { DynamicModule } from '@nestjs/common';
import { EventSourcingAsyncOptions, EventSourcingOptions } from './interfaces';
export declare class EventSourcingModule {
    static forRoot(options: EventSourcingOptions): DynamicModule;
    static forRootAsync(options: EventSourcingAsyncOptions): DynamicModule;
    static forFeature(): DynamicModule;
}
