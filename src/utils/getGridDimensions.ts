export const getGridDimensions = (
  listLength: number,
  customColumns?: number
) => {
  const grid: any[] = [[]]

  let gridWidth: number
  let gridHeight: number

  // Missing optional storage values can arrive as null at runtime. Treat any
  // invalid value as automatic sizing instead of producing an unusable grid.
  if (
    typeof customColumns === "number" &&
    Number.isFinite(customColumns) &&
    customColumns >= 1
  ) {
    gridWidth = customColumns
    gridHeight = Math.max(1, Math.ceil(listLength / gridWidth))
  } else {
    gridWidth = Math.max(1, Math.ceil(Math.sqrt(listLength)))
    gridHeight = Math.max(1, Math.ceil(listLength / gridWidth))
  }

  for (let i = 0; i < gridHeight; i++) {
    grid.push([])
    for (let j = 0; j < gridWidth; j++) {
      grid[i].push(null)
    }
  }

  return { grid, gridWidth, gridHeight }
}
