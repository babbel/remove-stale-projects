exports.getStaleProjects = (currentProjects, targetProjects) => (
  currentProjects.filter((p) => !targetProjects.includes(p.node.project.name))
);

exports.removeStaleProjects = async ({ client, projects }) => {
  // process projects sequentially to reduce risk of throttling by GitHub API
  for (const project of projects) {
    // eslint-disable-next-line no-await-in-loop
    await client.rest.projects.deleteCard({ card_id: project.node.databaseId });
  }
};
