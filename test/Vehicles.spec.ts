"use strict";
import * as assert from "assert";
import { createHighway } from "../lib/index";
import { Highway } from "../lib/src/Highway";
import * as common from "./common";
import * as loader from "./loader";

describe(`Test Vehicles API`, () => {
  let highway: Highway;
  let allVehicleIds: string[] = [];
  let allProjectIds: string[] = [];
  describe(`Authorization`, () => {
    before(async () => {
      const key = common.key;
      highway = createHighway(key);
      allProjectIds = (await highway.project.getAll()).map(
        (project) => project.id
      );

      const vehicles = await highway.vehicle.listFlat(allProjectIds[0]);
      vehicles.map(async (vehicle: any) => {
        await highway.vehicle.delete(vehicle.id);
      });
    });
    it(`it should create a vehicle with key`, async () => {
      const vehicle = await highway.vehicle.create({
        label: `test`,
      });
      assert.strictEqual(vehicle.label, `test`);
      allVehicleIds.push(vehicle.id);
    });
    it(`it should create a vehicle with key and project id`, async () => {
      const vehicle = await highway.vehicle.create(
        {
          label: `test`,
        },
        allProjectIds[0]
      );
      assert.strictEqual(vehicle.label, `test`);
      allVehicleIds.push(vehicle.id);
    });
    it(`it should create a vehicle with token`, async () => {
      const vehicle = await highway.vehicle.create(
        {
          label: `test`,
        },
        allProjectIds[0]
      );
      assert.strictEqual(vehicle.label, `test`);
      allVehicleIds.push(vehicle.id);
    });
  });
  describe(`Vehicle CRUD`, () => {
    it(`should create a vehicle`, async () => {
      const vehicle = await highway.vehicle.create(
        loader.vehicles.vehicle1,
        allProjectIds[0]
      );
      assert.strictEqual(vehicle.label, loader.vehicles.vehicle1.label);
      assert.strictEqual(
        vehicle.external_id,
        loader.vehicles.vehicle1.external_id
      );
      assert.deepStrictEqual(
        vehicle.default_timewindow,
        loader.vehicles.vehicle1.default_timewindow
      );
      allVehicleIds.push(vehicle.id);
    });
    it(`Should be able to create many vehicles at a time`, async () => {
      const vehicles = await highway.vehicle.createMany(
        [{}, {}, {}],
        allProjectIds[0]
      );
      assert.strictEqual(vehicles.length, 3);
      allVehicleIds = [...allVehicleIds, ...vehicles.map((c) => c.id)];
    });
    it(`Should be able to retrieve a single vehicle`, async () => {
      const vehicle = await highway.vehicle.get(allVehicleIds[3]);
      assert.strictEqual(vehicle.label, loader.vehicles.vehicle1.label);
      assert.strictEqual(
        vehicle.external_id,
        loader.vehicles.vehicle1.external_id
      );
    });
    it(`Should be able to retrieve a flat list of vehicles`, async () => {
      const clients = await highway.vehicle.listFlat(allProjectIds[0]);
      assert.strictEqual(clients.length, 4);
    });
    it(`Should be able to update a vehicle`, async () => {
      const vehicle = await highway.vehicle.update(allVehicleIds[2], {
        label: `new label`,
        price_per_distance: 123,
        price_per_minute: 456,
        default_start_location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(vehicle.label, `new label`);
      assert.strictEqual(vehicle.default_start_location?.lat, 12);
      assert.strictEqual(vehicle.default_start_location?.lng, 12);
      assert.strictEqual(vehicle.price_per_distance, 123);
      assert.strictEqual(vehicle.price_per_distance, 456);
    });
    it(`Should be able to retrieve a list of vehicles`, async () => {
      const vehicle = await highway.vehicle.list(allProjectIds[0]);
      assert.notStrictEqual(vehicle.docs.length, 0);
      assert.strictEqual(vehicle.offset, 0);
      assert.strictEqual(vehicle.limit, 20);
    });
    it(`Should be able to remove all previously created vehicles`, async () => {
      const promises = await Promise.all(
        allVehicleIds.map(async (val) => {
          const vehicle = await highway.vehicle.delete(val);
          assert.notStrictEqual(vehicle.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allVehicleIds.length);
    });
  });
});
