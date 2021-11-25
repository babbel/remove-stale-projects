const path = require('path');
const { getStaleProjects } = require('../stale-projects');

const fooproj = {node: {project: {name: "foo"}}};
const barproj = {node: {project: {name: "bar"}}};

test('no stale projects when current and target are both empty', async () => {
  expect(getStaleProjects([], [])).toStrictEqual([]);
});

test('no stale projects when current is empty', async () => {
  expect(getStaleProjects([], ["foo"])).toStrictEqual([]);
});

test('stale projects when target is empty', async () => {
  expect(getStaleProjects([fooproj], [])).toStrictEqual([fooproj]);
});

test('stale projects are what is in current but not target', async () => {
  expect(getStaleProjects([fooproj, barproj], ["bar", "baz"])).toStrictEqual([fooproj]);
});
