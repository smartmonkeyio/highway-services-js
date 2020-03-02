'use strict';
import * as assert from 'assert';
import { createHighway } from "../lib/index";
//import * as loader from "./loader";
import * as common from "./common";
import { Highway } from '../lib/src/Highway';

describe(`Test Plans API`, () => {
    let highway: Highway;
    const allPlanIds: string[] = [];
    before(() => {
        highway = createHighway(common.key);
    });
    describe(`Basic Plan CRUD`, () => {
        it(`it should create a new Plan`, async () => {
            const plan = await highway.plan.create({});
            assert.strictEqual(plan._version, 1);
            assert.strictEqual(plan.label, undefined);
            assert.notStrictEqual(plan.created_at, undefined);
            allPlanIds.push(plan.id);
        });
        it(`it should be able to retrieve the recently created plan`, async () => {
            const plan = await highway.plan.get(allPlanIds[0]);
            assert.strictEqual(plan._version, 1);
            assert.strictEqual(plan.label, undefined);
            assert.notStrictEqual(plan.created_at, undefined);
            allPlanIds.push(plan.id);
        });
        it(`it should be able to update the plan`, async () => {
            const plan = await highway.plan.update(allPlanIds[0], { label: `manolo` });
            assert.strictEqual(plan._version, 1);
            assert.strictEqual(plan.label, `manolo`);
        });
        it(`Optimize must do nothig with an empty list`, async () => {
            const plan = await highway.plan.optimize(allPlanIds[0]);
            assert.strictEqual(plan._version, 1);
            assert.strictEqual(plan.label, `manolo`);
            assert.strictEqual(plan.services.length, 0);
            assert.strictEqual(plan.routes.length, 0);
        });
        it(`Must be able to create services for a plan`, async () => {
            const plan = await highway.plan.addServices(allPlanIds[0], [{}, {}]);
            assert.strictEqual(plan.services.length, 2);
        });
        it(`Must be able to create routes for a plan`, async () => {
            const plan = await highway.plan.addRoutes(allPlanIds[0], [{}, {}]);
            assert.strictEqual(plan.routes.length, 2);
        });
        it(`Must be able to optimize routes of the current plan`, async () => {
            const plan = await highway.plan.optimize(allPlanIds[0]);
            assert.strictEqual(plan.routes.length, 2);
            assert.strictEqual(plan.services.length, 2);
        });
        it(`Must retrieve the list of plans`, async () => {
            const planList = await highway.plan.list();
            assert.strictEqual(planList.docs.length, 1);
            assert.strictEqual(planList.offset, 0);
            assert.strictEqual(planList.limit, 20);
        });
        it(`Should be able to remove all previously created plans`, async () => {
            const promises = await Promise.all(allPlanIds.map(async (val) => {
                const client = await highway.plan.delete(val);
                assert.notStrictEqual(client.deleted_at, undefined);
            }));
            assert.strictEqual(promises.length, allPlanIds.length);
        });
    });
});