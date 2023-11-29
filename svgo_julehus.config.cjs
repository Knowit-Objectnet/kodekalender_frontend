module.exports = {
  multipass: false,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 2 },
          convertPathData: { floatPrecision: 2 },
          convertTransform: { floatPrecision: 2 },
          cleanupIds: false
        }
      }
    },
    {
      name: 'cleanupIds',
      params: {
        preserve: ["Lockedx24", "Openx24", "Solvedx24"],
        preservePrefixes: ["Locked::", "Open::", "Solved::", "Julehus__"]
      }
    },
    {
      name: 'prefixIds',
      params: {
        prefix: "Julehus"
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ["data-.*"]
      }
    },
    'removeDimensions',
    'reusePaths',
    'minifyStyles',
    'mergeStyles',
    'mergePaths'
  ]
}