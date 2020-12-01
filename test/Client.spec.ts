"use strict";
import * as assert from "assert";
import { createHighway } from "../lib/index";
import { Highway } from "../lib/src/Highway";
import * as common from "./common";
import * as loader from "./loader";

describe(`Test Clients API`, () => {
  let highway: Highway;
  let allClientIds: string[] = [];
  let allProjectIds: string[] = [];
  describe(`Authorization`, () => {
    before(async () => {
      const key = common.key;
      highway = createHighway(key);
      allProjectIds = (await highway.project.getAll()).map(
        (project) => project.id
      );
    });
    it(`it should create a client with key`, async () => {
      const client = await highway.client.create({
        label: `test`,
      });

      assert.strictEqual(client.label, `test`);
      allClientIds.push(client.id);
    });
    it(`it should create a client with key and project id`, async () => {
      const client = await highway.client.create(
        {
          label: `test`,
        },
        allProjectIds[0]
      );

      assert.strictEqual(client.label, `test`);
      allClientIds.push(client.id);
    });
    it(`it should create a client with token and project id`, async () => {
      const client = await highway.client.create(
        {
          label: `test`,
        },
        allProjectIds[0]
      );
      assert.strictEqual(client.label, `test`);
      allClientIds.push(client.id);
    });
  });
  describe(`Client CRUD`, () => {
    it(`should create a client`, async () => {
      const client = await highway.client.create(
        loader.clients.client1,
        allProjectIds[0]
      );
      assert.strictEqual(client.label, loader.clients.client1.label);
      assert.strictEqual(
        client.external_id,
        loader.clients.client1.external_id
      );
      assert.deepStrictEqual(
        client.default_timewindows,
        loader.clients.client1.default_timewindows
      );
      allClientIds.push(client.id);
    });
    it(`Should be able to create many clients at a time`, async () => {
      const clients = await highway.client.createMany(
        [{}, {}, {}],
        allProjectIds[0]
      );
      assert.strictEqual(clients.length, 3);
      allClientIds = [...allClientIds, ...clients.map((c) => c.id)];
    });
    it(`Should be able to retrieve a single client`, async () => {
      const client = await highway.client.get(allClientIds[3]);
      assert.strictEqual(client.label, loader.clients.client1.label);
      assert.strictEqual(
        client.external_id,
        loader.clients.client1.external_id
      );
    });
    it(`Should be able to retrieve a flat list of clients`, async () => {
      const clients = await highway.client.listFlat(allProjectIds[0]);
      assert.strictEqual(clients.length, 7);
    });
    it(`Should be able to update a client`, async () => {
      const client = await highway.client.update(allClientIds[0], {
        label: `new label`,
        location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(client.label, `new label`);
      assert.strictEqual(client.location?.lat, 12);
      assert.strictEqual(client.location?.lng, 12);
    });
    it(`Should be able to retrieve a list of clients`, async () => {
      const client = await highway.client.list(allProjectIds[0]);
      assert.notStrictEqual(client.docs.length, 0);
      assert.strictEqual(client.offset, 0);
      assert.strictEqual(client.limit, 20);
    });
    it(`Should be able to remove all previously created clients`, async () => {
      const promises = await Promise.all(
        allClientIds.map(async (val) => {
          const client = await highway.client.delete(val);
          assert.notStrictEqual(client.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allClientIds.length);
    });
  });
});
