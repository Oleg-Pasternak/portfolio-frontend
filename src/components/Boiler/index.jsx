import { useEffect, useState, useCallback } from 'react';
import ProjectPreview from 'src/components/ProjectPreview'
import data from './data'

export function Boiler() {
  return (
    <div id='boiler'>
      {data.map((project, key) => {
        return (
          <ProjectPreview data={project} id={key} />
        )
      })}
    </div>
  )
}
