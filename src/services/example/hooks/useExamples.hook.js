import { exampleService } from '../example.service'

export function getExamples(params) {
  return exampleService.getExamples(params)
}
