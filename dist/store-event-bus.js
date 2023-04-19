"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreEventBus = void 0;
const common_1 = require("@nestjs/common");
const eventstore_1 = require("./eventstore");
const view_event_bus_1 = require("./view/view-event-bus");
let StoreEventBus = class StoreEventBus {
    constructor(eventBus, eventStore) {
        this.eventBus = eventBus;
        this.eventStore = eventStore;
    }
    publish(event) {
        const storableEvent = event;
        if (storableEvent.id === undefined ||
            storableEvent.eventAggregate === undefined ||
            storableEvent.eventVersion === undefined) {
            throw new Error('Events must implement StorableEvent interface');
        }
        this.eventStore
            .storeEvent(storableEvent)
            .then(() => this.eventBus.publish(event))
            .catch(err => {
            throw err;
        });
    }
    publishAll(events) {
        (events || []).forEach(event => this.publish(event));
    }
};
StoreEventBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [view_event_bus_1.ViewEventBus,
        eventstore_1.EventStore])
], StoreEventBus);
exports.StoreEventBus = StoreEventBus;
