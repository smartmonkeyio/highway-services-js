"use strict";
var expect = require("chai").expect;
var { createHighway } = require("../dist/index.js");
var { getVehicles, getServices, getRewardRegions } = require("./loader");
require("dotenv").config();

const publicKey =
  "priv_RKO7Z2_0-moFXhihGiPmTkQ-FVhJXTChaytA4kLpJUq9~DGVWtEp8WH74t4NDQr1";
const token = "testtoken";
const token2 =
  "eyJhbGciOiJIUzI1NiJ9.UVRBMkwxaENPR0kwUW1WR1MwZENhVWxVZWxvMWFFOVhSMlJDYldoaFFrMTZPVTAxYW1ORU4xVlFXVXR0U25KaE16WmhVVzlvYkdzMlpVNVFXV2xVTTNwbE9WSnlXRXROY0hWdFZuSnFVRmRhVmpOdVlqZDJTVzgwYVdaQk5pczNaeXRXUW1ST1oweHVVbEpOZEVKSksweDNaVzQ0Tm01Uk1EVkplbFZ1UWs5MU4yTkVWMUZ4Wm1NdlN6SlpTa3B1VkZaV01XSnZNRnBoUlVVeFZIUmtNWEZUTmpSQ09XdEthekZCUm5salUxZEliR2t5TlZsWU5XaFhMek0wY1ZwdVpqZEVVbTlWVVdSTFdIWnFObWhLVnpaWGQzUnFVVkFyZDBrMlEyWm5NWGhIWjJoR05VNHhXVFpwWVZZcldXbGFkMFJyVmpsb1pUbGFZVlJpT1ZZM05XdDZTVTlGWTBGVWRYQlpUelEwVDBWamMzaHBPSFZ2UzBKTGJUSk5jMWxVVDBOSVpVNWxXVkl5YWl0NGQwcExkbWM0YUZKNlNrbGpVMWQ2VFRoRGJ5dGhPRkZSTVhVMFVHODBZbmc1YjNaQ1drZFNiRVZuUFQwPQ.MoKgEzenOD8zLR3CSvgSSdvYNw4tslPg1KLdrHW0Ay8";

const globalClient = {
  label: "test",

  external_id: "test",
  icon: "normal",
  location: {
    label: "test",
    lat: 41.401893,
    lng: 2.114046
  },
  label: "test",
  tags: ["test", "test2"],
  comments: "this is a test",
  phone: "11111111111",
  email: "test@test.com",
  website: "www.test.com",
  reference_person: "test",
  default_duration: 60,
  default_reward: 1,
  default_requires: ["test", "test"],
  default_cluster: "test",
  default_assign_to: ["test"],
  //default_size: joi.number(),
  default_timewindows: [[3600, 7200]],
  default_volume: 30,
  default_weight: 30
};

describe("Highway", () => {
  describe("Create a highway object", () => {
    it("it should create a hihgway publicKey", () => {
      const hw = createHighway(publicKey);
      expect(hw.apiKey).to.eq(publicKey);
    });
    it("it should create a hihgway token", () => {
      const hw = createHighway(undefined, token);
      expect(hw.token).to.eq(token);
    });
    it("it should create a both key and token", () => {
      const hw = createHighway(publicKey, token);
      expect(hw.apiKey).to.eq(publicKey);
      expect(hw.token).to.eq(token);
    });
    it("it should create a client with key", async () => {
      const hw = createHighway(publicKey);
      const resp = await hw.client.create({ label: "test" });
      const client = resp.data;
      expect(client.label).to.eq("test");
    });
    it("it should create a client with token", async () => {
      const hw = createHighway(publicKey, token2);
      const resp = await hw.client.create({ label: "test" });
      const client = resp.data;
      expect(client.label).to.eq("test");
    });
    it("it should CRUD a client with all stuff", async () => {
      const hw = createHighway(publicKey, token2);
      const resp = await hw.client.create(globalClient);
      const client = resp.data;
      expect(client.label).to.eq(globalClient.label);
      expect(client.external_id).to.eq(globalClient.external_id);
      expect(client.tags[0]).to.eq(globalClient.tags[0]);
      expect(client.default_timewindows[0][0]).to.eq(
        globalClient.default_timewindows[0][0]
      );
      await hw.client.update(client.id, { label: "modified" });
      const resp2 = await hw.client.get(client.id);
      const clientModified = resp2.data;
      expect(clientModified.label).to.eq("modified");
      expect(clientModified.deleted_at).to.eq(undefined);
      const resp3 = await hw.client.delete(client.id);
      const deletedClient = resp3.data;
      expect(deletedClient.deleted_at).to.not.eq(undefined);
    });
  });
  describe("plan", () => {
    it("it should create a plan", async () => {
      const hw = createHighway(publicKey, undefined);
      const respo = await hw.plan.create({
        label: "testServices",
        external_id: "externalid"
      });
      const plan = respo.data;
      expect(plan.label).to.eq("testServices");
    });
  });
});
