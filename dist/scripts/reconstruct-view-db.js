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
exports.ReconstructViewDb = void 0;
const eventstore_1 = require("../eventstore");
const view_updater_1 = require("../view/view-updater");
class ReconstructViewDb {
    static run(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            };
            const eventStore = app.get(eventstore_1.EventStore);
            const viewUpdater = app.get(view_updater_1.ViewUpdater);
            while (!eventStore.isInitiated()) {
                yield sleep(100);
            }
            let event;
            let index = 0;
            while (event = yield eventStore.getEvent(index)) {
                yield viewUpdater.run(event);
                index++;
            }
            console.log('View db has been restored!');
        });
    }
}
exports.ReconstructViewDb = ReconstructViewDb;
