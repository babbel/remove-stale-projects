const nock = require('nock');
const github = require('@actions/github');
const { removeStaleProjects } = require('../stale-projects');

test('removes all projects successfully', async () => {
  nock('https://api.github.com')
    .delete('/projects/columns/cards/123')
    .reply(204);

  nock('https://api.github.com')
    .delete('/projects/columns/cards/456')
    .reply(204);

  expect.assertions(1);
  await removeStaleProjects({
    client: github.getOctokit('token'),
    projects: [{node: {databaseId: 123}}, {node: {databaseId: 456}}]
  });
  expect(nock.isDone()).toBe(true);
});

test('rejects if at least one of the requests fail', () => {
  nock('https://api.github.com')
    .delete('/projects/columns/cards/123')
    .reply(204);

  nock('https://api.github.com')
    .delete('/projects/columns/cards/456')
    .reply(404, "Not Found");

  expect(removeStaleProjects({
    client: github.getOctokit('token'),
    projects: [{node: {databaseId: 123}}, {node: {databaseId: 456}}]
  })).rejects.toThrow("Not Found");
});
