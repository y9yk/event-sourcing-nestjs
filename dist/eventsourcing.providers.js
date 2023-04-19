"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSourcingProviders = void 0;
const view_1 = require("./view");
const view_2 = require("./view");
const store_event_bus_1 = require("./store-event-bus");
const store_event_publisher_1 = require("./store-event-publisher");
const aggregate_repository_1 = require("./aggregate-repository");
function createEventSourcingProviders() {
    return [
        view_1.ViewUpdater,
        view_2.ViewEventBus,
        store_event_bus_1.StoreEventBus,
        store_event_publisher_1.StoreEventPublisher,
        aggregate_repository_1.AggregateRepository,
    ];
}
exports.createEventSourcingProviders = createEventSourcingProviders;
