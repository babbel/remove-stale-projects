exports.getStaleProjects = (currentProjects, targetProjects) => {
  return currentProjects.filter(p => !targetProjects.includes(p.node.project.name));
};

exports.removeStaleProjects = ({client, projects}) => {
  return Promise.all(projects.map(staleProject => {
    return client.rest.projects.deleteCard({ card_id: staleProject.node.databaseId })
  }))
};
