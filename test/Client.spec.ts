
'use strict';
import * as assert from 'assert';
import { createHighway } from "../lib/index";
import * as loader from "./loader";
import * as common from "./common";
import { Highway } from '../lib/src/Highway';


describe(`Test Clients API`, () => {
  let highway: Highway;
  let allClientIds: string[] = [];
  describe(`Authorization`, () => {
    before(() => {
      const key = common.key;
      highway = createHighway(key);
    });
    it(`it should create a client with key`, async () => {
      const client = await highway.client.create({ label: `test` });
      assert.strictEqual(client.label, `test`);
      allClientIds.push(client.id);
    });
    it(`it should create a client with token`, async () => {
      const client = await highway.client.create({ label: `test` });
      assert.strictEqual(client.label, `test`);
      allClientIds.push(client.id);
    });
  });
  describe(`Client CRUD`, () => {
    it(`should create a client`, async () => {
      const client = await highway.client.create(loader.clients.client1);
      assert.strictEqual(client.label, loader.clients.client1.label);
      assert.strictEqual(client.external_id, loader.clients.client1.external_id);
      assert.deepStrictEqual(client.tags, loader.clients.client1.tags);
      assert.deepStrictEqual(
        client.default_timewindows,
        loader.clients.client1.default_timewindows
      );
      allClientIds.push(client.id);
    });
    it(`Should be able to create many clients at a time`, async () => {
      const clients = await highway.client.createMany([{}, {}, {}]);
      assert.strictEqual(clients.length, 3);
      allClientIds = [...allClientIds, ...clients.map(c => c.id)];
    });
    it(`Should be able to retrieve a single client`, async () => {
      const client = await highway.client.get(allClientIds[2]);
      assert.strictEqual(client.label, loader.clients.client1.label);
      assert.strictEqual(client.external_id, loader.clients.client1.external_id);
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
      const client = await highway.client.list();
      assert.notStrictEqual(client.docs.length, 0);
      assert.strictEqual(client.offset, 0);
      assert.strictEqual(client.limit, 20);
    });
    it(`Should be able to remove all previously created clients`, async () => {
      const promises = await Promise.all(allClientIds.map(async (val) => {
        const client = await highway.client.delete(val);
        assert.notStrictEqual(client.deleted_at, undefined);
      }));
      assert.strictEqual(promises.length, allClientIds.length);
    });
  });
});
