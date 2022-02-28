import { Errors } from './genericErrors.interface';
import { GenericResponseStatus } from './genericStatus.interface';

export interface GenericResponse<T> {
  status?: GenericResponseStatus;
  data?: T | Array<T> | Record<string, never>;
  error?: Errors;
}
