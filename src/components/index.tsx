import dynamic from 'next/dynamic';

const ProjectsBlock = dynamic(() => import('src/components/ProjectsBlock').then((mod) => mod.ProjectsBlock));
const StackBlock = dynamic(() => import('src/components/StackBlock').then((mod) => mod.StackBlock));


export const components = {
    ProjectsBlock: ProjectsBlock,
    StackBlock: StackBlock,
}