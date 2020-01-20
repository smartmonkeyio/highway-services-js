
'use strict';
import * as assert from 'assert';
import { createHighway } from "../lib/index";

describe(`Create a highway object`, () => {
  const privateKey = process.env.HIGHWAY_PRIVATE_KEY || ``;
  const token = process.env.HIGHWAY_TOKEN || ``;

  it(`it should create a hihgway privateKey`, () => {
    const highway = createHighway(privateKey);
    assert.strictEqual(highway.apiKey, privateKey);
  });
  it(`it should create a hihgway token`, () => {
    const hw = createHighway(``, token);
    assert.strictEqual(hw.token, token);
  });
  it(`it should create a both key and token`, () => {
    const hw = createHighway(privateKey, token);
    assert.strictEqual(hw.apiKey, privateKey);
    assert.strictEqual(hw.token, token);
  });
});
