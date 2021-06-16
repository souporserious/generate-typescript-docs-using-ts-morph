import * as path from 'path'
import { Project } from 'ts-morph'

export default function App(props) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h1>Generate TypeScript Docs Using TS Morph</h1>
      <h2>Code</h2>
      <pre>{props.codeString}</pre>
      <h2>Docs</h2>
      <pre>{JSON.stringify(props.docs, null, 2)}</pre>
    </div>
  )
}

export function getStaticProps() {
  const project = new Project({
    tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
  })
  const source = project.getSourceFile(
    path.resolve(process.cwd(), 'Example.tsx')
  )
  const components = source.getFunctions().filter((declaration) => {
    const name = declaration.getName()
    const isComponent = name[0] === name[0].toUpperCase()
    return isComponent && declaration.hasExportKeyword()
  })
  const docs = components.map((declaration) => {
    const [props] = declaration.getParameters()
    const type = props.getType()
    const types = type.getProperties().map((prop) => {
      const [node] = prop.getDeclarations()
      const [range] = node.getLeadingCommentRanges()
      return {
        name: prop.getName(),
        type: prop.getTypeAtLocation(declaration).getText(),
        comment: range.getText(),
      }
    })
    return {
      name: declaration.getName(),
      types,
    }
  })
  return {
    props: {
      codeString: source.getFullText(),
      docs,
    },
  }
}
