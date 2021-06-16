type ExampleProps = {
  /** The title of the example. */
  title?: string

  /* The color of the text. */
  color?: string

  /** The horizontal alignment of the text. */
  align?: 'left' | 'center' | 'right'
}

export function Example({ title, color, align }: ExampleProps) {
  return (
    <div
      style={{
        color,
        textAlign: align,
      }}
    >
      {title}
    </div>
  )
}
