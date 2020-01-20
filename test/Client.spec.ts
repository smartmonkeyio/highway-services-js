
'use strict';
import * as assert from 'assert';
import { createHighway } from "../lib/index";
import * as loader from "./loader";
import * as common from "./common";


describe(`Test Clients API`, () => {
  let highway: any;
  before(() => {
    const key = common.key;
    highway = createHighway(key);
  });
  it(`it should create a client with key`, async () => {
    const client = await highway.client.create({ label: `test` });
    assert.strictEqual(client.label, `test`);
  });
  it(`it should create a client with token`, async () => {
    const client = await highway.client.create({ label: `test` });
    assert.strictEqual(client.label, `test`);
  });
  it(`it should CRUD a client with all stuff`, async () => {
    const client = await highway.client.create(loader.clients.client1);
    assert.strictEqual(client.label, loader.clients.client1.label);
    assert.strictEqual(client.external_id, loader.clients.client1.external_id);
    assert.strictEqual(client.tags[0], loader.clients.client1.tags[0]);
    assert.strictEqual(
      client.default_timewindows[0][0],
      loader.clients.client1.default_timewindows[0][0]
    );
  });
});
