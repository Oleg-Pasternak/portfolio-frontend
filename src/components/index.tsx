import dynamic from 'next/dynamic';

export const components: { [key: string]: React.ComponentType<any> } = {
  ProjectsBlock: dynamic(() => import('src/components/ProjectsBlock').then((mod) => mod.ProjectsBlock)),
  StackBlock: dynamic(() => import('src/components/StackBlock').then((mod) => mod.StackBlock)),
}

