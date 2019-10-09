const {execSync} = require('child_process')

const TESTABLE_PLUGINS = [
  'alt-title-editor',
  'bulk-editor',
  'chart',
  'co-working',
  'hidden-field',
  'hide-field-from-role',
  'send-record-id'
]

const runTests = (path) => {
  const root = process.cwd()
  process.chdir(path)
  execSync('yarn install', {stdio: [0,1,2]})
  let testExitCode = 0
  try {
    execSync('yarn test', {stdio: [0,1,2]})
  }
  catch(error) {
    testExitCode = 1
  }
  finally {
    process.chdir(root)
  }
  return testExitCode
}

let finalExitCode = 0

TESTABLE_PLUGINS.forEach(path => {
  console.log(`\nRunning tests for '${path}'`)
  const testExitCode = runTests(path)
  if (testExitCode !== 0) {
    finalExitCode = 1
  }
})

process.exit(finalExitCode)
