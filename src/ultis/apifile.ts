import { ApiBody } from '@nestjs/swagger';

export const ApiFile =
  (fileName: string = 'photo'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
          jobTitle: { type: 'string' },
          cellPhone: { type: 'string' },
          email: { type: 'string' },
          managerId: { type: 'string' },
        },
      },
    })(target, propertyKey, descriptor);
  };
