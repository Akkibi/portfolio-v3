import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { AboutComponent } from './animations/AboutAnimations'
import { HomeComponent } from './animations/HomeAnimations'
import LoadAnimation from './components/LoadAnimation'
import App from './App'
import './index.css'
import projectData from './data.json'
import LoadProject from './components/LoadProject'
import LoadAbout from './components/LoadAbout'
import { Project } from './types'

export const countData: number[] = [
  projectData['Developpeur'].length,
  projectData['Artiste2D'].length,
  projectData['Artiste3D'].length,
  projectData['Developpeur'].length +
    projectData['Artiste2D'].length +
    projectData['Artiste3D'].length,
]

const categoryList: string[] = [
  ...projectData['Developpeur'].map((element) => element.name),
  ...projectData['Artiste2D'].map((element) => element.name),
  ...projectData['Artiste3D'].map((element) => element.name),
]

const generateProjectRoutes = (data: any) => {
  const categoryArrays = Object.values(data)
  let projectIndex = 0
  const output: any = categoryArrays.flatMap((category: any, index: number) =>
    category.map((project: Project) => {
      projectIndex++
      return {
        path: project.name,
        element: (
          <LoadProject
            projectData={project}
            projectIndex={projectIndex}
            index={index + 1}
            projectList={categoryList}
          />
        ),
      }
    })
  )
  return output
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App countData={countData} projectList={categoryList} />,
    children: [
      {
        path: '/',
        element: <LoadAnimation anim={HomeComponent} />,
      },
      {
        path: 'about',
        element: <LoadAbout anim={AboutComponent} />,
      },
      ...generateProjectRoutes(projectData),
    ],
  },
])

let container: HTMLElement | null = null

document.addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)
    root.render(<RouterProvider router={router} />)
  }
})

reportWebVitals()
