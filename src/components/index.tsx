import dynamic from 'next/dynamic';

export const components: { [key: string]: React.ComponentType<any> } = {
  ProjectsBlock: dynamic(() => import('src/components/ProjectsBlock').then((mod) => mod.ProjectsBlock)),
  StackBlock: dynamic(() => import('src/components/StackBlock').then((mod) => mod.StackBlock)),
  WideImage: dynamic(() => import('src/components/ui/WideImage').then((mod) => mod.WideImage)),
  MobilePreview: dynamic(() => import('src/components/MobilePreview').then((mod) => mod.MobilePreview)),
  DesktopPreview: dynamic(() => import('src/components/DesktopPreview').then((mod) => mod.DesktopPreview)),
  Description: dynamic(() => import('src/components/Description').then((mod) => mod.Description)),
}