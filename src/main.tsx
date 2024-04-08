import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { AboutComponent } from './components/AboutRender'
import { HomeComponent } from './components/HomeRender'
import LoadAnimation from './components/LoadAnimationComponent'
import App from './App'
import './index.css'
import projectData from './data.json'
import LoadProject from './components/LoadProjectComponent'
import LoadAbout from './components/LoadAboutComponent'

interface Project {
  name: string
  date: string
  title: string
  description: string
  images: string[]
  webpImages: string[]
  videos: string[]
  list: { [key: string]: string }
  link: string[]
  colors: string[]
}

const categorie0Projects = Object.keys(projectData['Developpeur']).length
const categorie1Projects = Object.keys(projectData['Artiste2D']).length
const categorie2Projects = Object.keys(projectData['Artiste3D']).length
const countData: Array<number> = [
  categorie0Projects,
  categorie1Projects,
  categorie2Projects,
  categorie0Projects + categorie1Projects + categorie2Projects,
]

let categoryList: Array<string> = []

projectData['Developpeur'].forEach((element) => {
  categoryList.push(element.name)
})
projectData['Artiste2D'].forEach((element) => {
  categoryList.push(element.name)
})
projectData['Artiste3D'].forEach((element) => {
  categoryList.push(element.name)
})

const generateProjectRoutes = (data: any) => {
  const categoryArrays = Object.values(data)
  let ProjectIndex = 0
  const output: any = categoryArrays.flatMap((category: any, index: number) => {
    return category.map(
      (project: Project) => (
        ProjectIndex++,
        {
          path: project.name,
          element: (
            <LoadProject
              projectData={project}
              projectIndex={ProjectIndex}
              index={index + 1}
              countData={countData}
              projectList={categoryList}
            />
          ),
        }
      )
    )
  })
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
    console.log(router)
    root.render(<RouterProvider router={router} />)
  }
})

reportWebVitals()
