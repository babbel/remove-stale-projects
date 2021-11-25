const core = require('@actions/core');
const github = require('@actions/github');
const { getStaleProjects, removeStaleProjects } = require('./stale-projects');

async function run() {
  try {
    const currentProjects = JSON.parse(core.getInput('current-projects', { required: true }));
    const targetProjects = JSON.parse(core.getInput('current-projects', { required: true }));
    const token = core.getInput('github-token', { required: true });
    const octokit = github.getOctokit(token);

    const staleProjects = getStaleProjects(currentProjects, targetProjects);
    await removeStaleProjects({ client: octokit, projects: staleProjects });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
