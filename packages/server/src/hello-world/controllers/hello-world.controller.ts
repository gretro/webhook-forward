import { Controller, Get, Route } from 'tsoa';

@Route('/api/v1/hello-world')
export class HelloWorldController extends Controller {
  @Get()
  async getHelloWorld() {
    return {
      message: 'Hello world!',
    };
  }
}
