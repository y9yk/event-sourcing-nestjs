"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const eventstore = require("eventstore");
const url = require("url");
class EventStore {
    constructor(mongoURL) {
        this.eventStoreLaunched = false;
        let ssl = false;
        const parsed = url.parse(mongoURL, true);
        if (parsed.query &&
            parsed.query.ssl !== undefined &&
            parsed.query.ssl === 'true') {
            ssl = true;
        }
        this.eventstore = eventstore({
            type: 'mongodb',
            url: mongoURL,
            options: {
                ssl: ssl,
            },
        });
        this.eventstore.init(err => {
            if (err) {
                console.log(err);
                throw err;
            }
            this.eventStoreLaunched = true;
        });
    }
    isInitiated() {
        return this.eventStoreLaunched;
    }
    getEvents(aggregate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.eventstore.getFromSnapshot(this.getAgrregateId(aggregate, id), (err, snapshot, stream) => {
                    resolve(stream.events.map(event => this.getStorableEventFromPayload(event.payload)));
                });
            });
        });
    }
    getEvent(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.eventstore.getEvents(index, 1, (err, events) => {
                    if (events.length > 0) {
                        resolve(this.getStorableEventFromPayload(events[0].payload));
                    }
                    else {
                        resolve(null);
                    }
                });
            });
        });
    }
    storeEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this.eventStoreLaunched) {
                    reject('Event Store not launched!');
                    return;
                }
                this.eventstore.getEventStream({
                    aggregateId: this.getAgrregateId(event.eventAggregate, event.id),
                    aggregate: event.eventAggregate,
                }, (err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    stream.addEvent(event);
                    stream.commit(commitErr => {
                        if (commitErr) {
                            reject(commitErr);
                        }
                        resolve();
                    });
                });
            });
        });
    }
    getStorableEventFromPayload(payload) {
        const eventPlain = payload;
        eventPlain.constructor = { name: eventPlain.eventName };
        return Object.assign(Object.create(eventPlain), eventPlain);
    }
    getAgrregateId(aggregate, id) {
        return aggregate + '-' + id;
    }
}
exports.EventStore = EventStore;
