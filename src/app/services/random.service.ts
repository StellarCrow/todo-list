import { Injectable } from '@angular/core';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  private chance = new Chance();

  public getRandomDate(year: number, month: number[]): string | Date {
    return this.chance.date({ string: true, year: +year, month: this.randomNumber(month[0], month[1]), american: false });
  }

  public getRandomName(): string {
    return this.chance.name();
  }

  private randomNumber(from: number, to: number): number {
    const rand = from + Math.random() * (to + 1 - from);
    return Math.floor(rand);
  }
}
