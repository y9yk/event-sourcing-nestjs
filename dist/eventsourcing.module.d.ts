import { DynamicModule } from '@nestjs/common';
import { EventSourcingOptions } from './interfaces';
export declare class EventSourcingModule {
    static forRoot(options: EventSourcingOptions): DynamicModule;
    static forFeature(): DynamicModule;
}
