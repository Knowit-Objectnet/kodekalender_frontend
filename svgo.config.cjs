module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 2 },
          convertPathData: { floatPrecision: 2 },
          convertTransform: { floatPrecision: 2 }
        }
      }
    },
    'removeDimensions', // Removes width= and height= in favor of viewbox (scales properly)
    'reusePaths',
    'cleanupIds',
    'minifyStyles',
    'mergeStyles',
    'mergePaths'
  ]
}