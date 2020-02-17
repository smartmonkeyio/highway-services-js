"use strict";
import * as assert from "assert";
import { createHighway } from "../lib/index";
import * as loader from "./loader";
import * as common from "./common";
import { Highway } from "../lib/src/Highway";

describe(`Test Vehicles API`, () => {
  let highway: Highway;
  let allVehicleIds: string[] = [];
  describe(`Authorization`, () => {
    before(() => {
      const key = common.key;
      highway = createHighway(key);
    });
    it(`it should create a vehicle with key`, async () => {
      const vehicle = await highway.vehicle.create({ label: `test` });
      assert.strictEqual(vehicle.label, `test`);
      allVehicleIds.push(vehicle.id);
    });
    it(`it should create a vehicle with token`, async () => {
      const vehicle = await highway.vehicle.create({ label: `test` });
      assert.strictEqual(vehicle.label, `test`);
      allVehicleIds.push(vehicle.id);
    });
  });
  describe(`Vehicle CRUD`, () => {
    it(`should create a vehicle`, async () => {
      const vehicle = await highway.vehicle.create(loader.vehicles.vehicle1);
      assert.strictEqual(vehicle.label, loader.vehicles.vehicle1.label);
      assert.strictEqual(
        vehicle.external_id,
        loader.vehicles.vehicle1.external_id,
      );
      assert.deepStrictEqual(
        vehicle.default_timewindow,
        loader.vehicles.vehicle1.default_timewindow,
      );
      allVehicleIds.push(vehicle.id);
    });
    it(`Should be able to create many vehicles at a time`, async () => {
      const vehicles = await highway.vehicle.createMany([{}, {}, {}]);
      assert.strictEqual(vehicles.length, 3);
      allVehicleIds = [...allVehicleIds, ...vehicles.map(c => c.id)];
    });
    it(`Should be able to retrieve a single vehicle`, async () => {
      const vehicle = await highway.vehicle.get(allVehicleIds[2]);
      assert.strictEqual(vehicle.label, loader.vehicles.vehicle1.label);
      assert.strictEqual(
        vehicle.external_id,
        loader.vehicles.vehicle1.external_id,
      );
    });
    it(`Should be able to retrieve a flat list of vehicles`, async () => {
      const clients = await highway.vehicle.listFlat();
      assert.strictEqual(clients.length, 6);
    });
    it(`Should be able to update a vehicle`, async () => {
      const vehicle = await highway.vehicle.update(allVehicleIds[2], {
        label: `new label`,
        default_start_location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(vehicle.label, `new label`);
      assert.strictEqual(vehicle.default_start_location?.lat, 12);
      assert.strictEqual(vehicle.default_start_location?.lng, 12);
    });
    it(`Should be able to retrieve a list of vehicles`, async () => {
      const vehicle = await highway.vehicle.list();
      assert.notStrictEqual(vehicle.docs.length, 0);
      assert.strictEqual(vehicle.offset, 0);
      assert.strictEqual(vehicle.limit, 20);
    });
    it(`Should be able to remove all previously created vehicles`, async () => {
      const promises = await Promise.all(
        allVehicleIds.map(async val => {
          const vehicle = await highway.vehicle.delete(val);
          assert.notStrictEqual(vehicle.deleted_at, undefined);
        }),
      );
      assert.strictEqual(promises.length, allVehicleIds.length);
    });
  });
});
