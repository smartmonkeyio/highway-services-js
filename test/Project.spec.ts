import * as assert from 'assert';
import FormData from 'form-data';
import { IPutProjectCustomFieldPayload } from '../lib/common/interfaces/projects';
import { createHighway } from '../lib/index';
import { Highway } from '../lib/src/Highway';
import { IProjectCustomFieldPayload } from '../lib/src/Project';
//import * as loader from "./loader";
import * as common from './common';
import * as storageLoader from './loaders/storage.loader';

describe(`Test Projects API`, () => {
  let highway: Highway;
  let project: any;
  let projectName: string;
  const allProjectsIds: string[] = [];
  before(async () => {
    highway = createHighway(common.key);

    // First of all remove all the previow projects.
    const projects = await highway.project.getAll();
    await Promise.all(
      projects.map(async (val) => {
        try {
          await highway.project.delete(val.id);
        } catch (_) {
          console.log(`Default project could not be removed. Avoiding this.`);
        }
      })
    );
  });
  describe(`Basic Project CRUD`, async () => {
    it(`it should create a new Project`, async function () {
      this.timeout(10000);

      projectName = `test`;
      project = await highway.project.create({ label: projectName });
      assert.strictEqual(project.label, projectName);
      assert.notStrictEqual(project.created_at, undefined);
      allProjectsIds.push(project.id);
    });
    it(`it should be able to retrieve the recently created project`, async () => {
      project = await highway.project.get(allProjectsIds[0]);
      assert.strictEqual(project.label, projectName);
      assert.notStrictEqual(project.created_at, undefined);
    });
    it(`it should be able to update the project`, async () => {
      const newProjectName = `manolo`;
      project = await highway.project.update(allProjectsIds[0], {
        label: newProjectName,
      });
      assert.strictEqual(project.label, newProjectName);
    });
    it(`Must retrieve the list of user projects`, async () => {
      const projects = await highway.project.getAll();
      assert.strictEqual(projects.length, 2);
    });
    it(`Should be able to remove all previously created projects`, async () => {
      const promises = await Promise.all(
        allProjectsIds.map(async (val) => {
          const project = await highway.project.delete(val);
          assert.notStrictEqual(project.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allProjectsIds.length);
    });
  });
  describe(`Basic Project Users CRUD`, async () => {
    let projectId: string;
    before(async function () {
      this.timeout(10000);
      projectName = `test`;
      const project = await highway.project.create({ label: projectName });
      projectId = project.id;
    });
    it(`it should be able to retrieve all the project users`, async () => {
      const projectUsers = await highway.project.getUsers(projectId);
      assert.strictEqual(projectUsers.length, 1);
    });

    // The above tests could not work because we can't create users from API.

    // it(`it should be able to create a project user`, async () => {
    //   // TESTS SHOULD BE ABLE TO CREATE USERS

    //   project = await highway.project.createUser(projectId, {
    //     user_id: `asdqwe123`,
    //     role: ProjectRoles.project_user,
    //   });
    //   const projectUsers = await highway.project.getUsers(projectId);

    //   console.log(`projectUsers`, projectUsers);

    //   assert.strictEqual(projectUsers.length, 2);
    // });
    // it(`it should be able to update the user project`, async () => {
    //   // UPDATE user that we have created at the last test.

    //   project = await highway.project.updateUser(projectId, `asdqwe123`, {
    //     role: ProjectRoles.project_user,
    //   });
    //   const projectUsers = await highway.project.getUsers(projectId);

    //   console.log(`projectUsers`, projectUsers);

    //   assert.strictEqual(projectUsers.length, 2);
    // });
    // it(`it should be able to delete a project user`, async () => {
    //   // DELETE user that we have created at the last test.

    //   project = await highway.project.deleteUser(projectId, `asdqwe123`);
    //   const projectUsers = await highway.project.getUsers(projectId);

    //   console.log(`projectUsers`, projectUsers);

    //   assert.strictEqual(projectUsers.length, 2);
    // });
  });

  describe(`Basic Project Avatar CRUD`, async () => {
    let project: any;
    let uploadData: any;
    it(`it should create a new project avatar`, async function () {
      this.timeout(10000);

      project = await highway.project.create({ label: `Test Project` });

      const binaryData = storageLoader.files.imgMedium.toString(`binary`);

      const formData = new FormData();
      formData.append(`data`, binaryData);
      formData.append(`name`, `text.txt`);
      formData.append(`mime`, `image/jpeg`);
      uploadData = await highway.project.createAvatar(project.id, formData);

      const projectUpdated = await highway.project.get(project.id);
      assert.notStrictEqual(projectUpdated.avatar, undefined);
    });

    it(`it should delete a project avatar`, async function () {
      this.timeout(10000);
      project = await highway.project.deleteAvatar(project.id, uploadData.id);
      assert.strictEqual(project.avatar, undefined);
    });
  });

  describe(`Basic Project Custom Fields CRUD`, async () => {
    let project: any;
    const customField: IProjectCustomFieldPayload = {
      id: `my2_custom_field`,
      label: `My custom field`,
      type: `text`,
      enabled: true,
    };
    it(`it should create a new project custom field`, async function () {
      this.timeout(10000);

      project = await highway.project.create({ label: `Test Project` });

      project = await highway.project.createCustomField(
        project.id,
        `service_report_completed`,
        customField
      );

      assert.strictEqual(project.custom_fields.client.length, 0);
      assert.strictEqual(project.custom_fields.vehicle.length, 0);
      assert.strictEqual(project.custom_fields.service_report_canceled.length, 0);

      const found = project.custom_fields.service_report_completed.find(
        (field: any) => field.id === customField.id
      );
      assert.notStrictEqual(found, undefined);
      assert.strictEqual(found.label, customField.label);
      assert.strictEqual(found.type, customField.type);
      // assert.strictEqual(found.optional, false); // NOT YET!
      assert.strictEqual(found.enabled, customField.enabled);
      assert.notStrictEqual(found.created_at, undefined);
    });

    it(`it should edit a project custom field`, async function () {
      this.timeout(10000);

      const customFieldUpdate: IPutProjectCustomFieldPayload = {
        label: `New label`,
        description: `The description of the custom field`,
        enabled: false,
        order: 0,
      };

      project = await highway.project.editCustomField(
        project.id,
        `service_report_completed`,
        customField.id,
        customFieldUpdate
      );

      assert.strictEqual(project.custom_fields.client.length, 0);
      assert.strictEqual(project.custom_fields.vehicle.length, 0);
      assert.strictEqual(project.custom_fields.service_report_canceled.length, 0);

      const found = project.custom_fields.service_report_completed.find(
        (field: any) => field.id === customField.id
      );
      assert.notStrictEqual(found, undefined);
      assert.strictEqual(found.label, customFieldUpdate.label);
      assert.strictEqual(found.type, customField.type);
      // assert.strictEqual(found.optional, false); // NOT YET!
      assert.strictEqual(found.enabled, customFieldUpdate.enabled);
      assert.notStrictEqual(found.created_at, undefined);
    });

    it(`it should delete a project custom field`, async function () {
      this.timeout(10000);

      project = await highway.project.deleteCustomField(
        project.id,
        `service_report_completed`,
        customField.id
      );

      assert.deepStrictEqual(project.custom_fields, {
        client: [],
        vehicle: [],
        service_report_canceled: [],
        service_report_completed: [],
      });
    });
  });
});
