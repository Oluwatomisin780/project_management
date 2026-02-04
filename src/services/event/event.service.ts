import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
  constructor(private eventEmitter: EventEmitter2) {}

  async event(event: string, data: any) {
    console.log(`Event Emitted  ${event}`, data);
    return this.eventEmitter.emit(event, data);
  }
}
