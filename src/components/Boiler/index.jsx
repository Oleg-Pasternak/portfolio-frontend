import { useEffect, useState, useCallback } from 'react';
import ProjectPreview from 'src/components/ProjectPreview'

export function Boiler() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      {/* {data.map((project, key) => {
        return (
          <ProjectPreview data={project} id={key} />
        )
      })} */}
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
    </div>
  )
}
