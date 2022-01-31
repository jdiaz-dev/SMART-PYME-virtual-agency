import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty()
  offset: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  total: number;

  results: Array<T> = [];

  constructor(results: Array<T>, size: number = 50, offset: number = 0) {
    this.total = results.length;
    this.offset = offset;
    this.size = size;
    this.results = results.slice(
      offset == 0 ? offset : offset - 1,
      size + offset,
    );
  }
}
