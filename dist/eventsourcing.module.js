"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventSourcingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourcingModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const eventstore_1 = require("./eventstore");
const eventsourcing_providers_1 = require("./eventsourcing.providers");
const constants_1 = require("./constants");
let EventSourcingModule = EventSourcingModule_1 = class EventSourcingModule {
    static forRoot(options) {
        return {
            module: EventSourcingModule_1,
            providers: [
                {
                    provide: eventstore_1.EventStore,
                    useValue: new eventstore_1.EventStore(options.mongoURL),
                },
            ],
            exports: [eventstore_1.EventStore],
            global: true,
        };
    }
    static forRootAsync(options) {
        return {
            module: EventSourcingModule_1,
            providers: [
                {
                    provide: constants_1.EVENT_SOURCING_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                {
                    provide: eventstore_1.EventStore,
                    useFactory: (options) => {
                        return new eventstore_1.EventStore(options.mongoURL);
                    },
                    inject: [constants_1.EVENT_SOURCING_OPTIONS],
                },
            ],
            exports: [eventstore_1.EventStore],
            global: true,
        };
    }
    static forFeature() {
        const providers = (0, eventsourcing_providers_1.createEventSourcingProviders)();
        return {
            module: EventSourcingModule_1,
            imports: [cqrs_1.CqrsModule],
            providers: providers,
            exports: providers,
        };
    }
};
EventSourcingModule = EventSourcingModule_1 = __decorate([
    (0, common_1.Module)({})
], EventSourcingModule);
exports.EventSourcingModule = EventSourcingModule;
