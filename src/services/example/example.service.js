import { ApiService } from '../../core/base-api/api-service'

class ExampleService extends ApiService {
  getExamples(params) {
    return this.request('/examples', { method: 'GET', params })
  }
}

export const exampleService = new ExampleService()
