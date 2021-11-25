exports.getStaleProjects = (currentProjects, targetProjects) => (
  currentProjects.filter((p) => !targetProjects.includes(p.node.project.name))
);

exports.removeStaleProjects = async ({ client, projects }) => (
  Promise.all(projects.map((staleProject) => (
    client.rest.projects.deleteCard({ card_id: staleProject.node.databaseId })
  )))
);
