export const getRecentProjects = async () => {
    const projectIds = localStorage.getItem('recentProjects');
    if (projectIds) {
        const parsedProjectIds = JSON.parse(projectIds);
        const response = await fetch("/api/projects/recentProjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectIds: parsedProjectIds
            })
        });

        let projects = await response.json();
        // Sort by opened
        return parsedProjectIds.map((projectId: string) => projects.find((project: any) => project.id === projectId));
    }
    return [];
}

export const setRecentProject = (projectId: string) => {
    let recentProjects = JSON.parse(localStorage.getItem('recentProjects') as any) || [];
    const index = recentProjects.findIndex((id: string) => id === projectId);
    if (index !== -1) {
        recentProjects.splice(index, 1);
    }
    recentProjects.unshift(projectId);
    if (recentProjects.length > 5) {
        recentProjects.pop();
    }
    localStorage.setItem('recentProjects', JSON.stringify(recentProjects));
}