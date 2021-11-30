const core = require('@actions/core');
const github = require('@actions/github');
const { getStaleProjects, removeStaleProjects } = require('./stale-projects');

async function run() {
  try {
    // NOTE:
    // - current-projects is a list of objects (see babbel/current-projects)
    // - target-projects is a list of strings
    const currentProjects = JSON.parse(core.getInput('current-projects', { required: true }));
    const targetProjectNames = JSON.parse(core.getInput('target-projects', { required: true }));
    const token = core.getInput('github-token', { required: true });
    const octokit = github.getOctokit(token);

    const staleProjects = getStaleProjects(currentProjects, targetProjectNames);
    await removeStaleProjects({ client: octokit, projects: staleProjects });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
