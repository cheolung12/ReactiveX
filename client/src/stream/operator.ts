import { filter, fromEvent, interval, map, range, tap } from 'rxjs';
/*
Piapable operators
- observable의 데이터를 pure function으로 가공
  => 현존하는 데이터를 수정하지 않는다!
- pipe 함수에 하나 이상 넣어 연결
*/
export const opPrac1 = () => {
  const observable$ = range(1, 10);

  const observer = {
    next: (x: number) => console.log(x + ' 발행'),
    error: (err: any) => console.error('발행중 오류', err),
    complete: () => console.log('발행물 완결'),
  };

  observable$
    .pipe(
      filter((x) => x % 2 === 0),
      map((x) => x * x)
    )
    .subscribe(observer);
};

export const opPrac2 = () => {
  const observable$ = interval(1000);

  observable$
    .pipe(
      // 모든값이 tap으로 출력은 되지만, 발행은 필터링된 값만
      tap(console.log),
      filter((x) => x % 2 === 0),
      map((x) => x * x)
    )
    .subscribe((x) => console.log(x, '발행'));
};

export const opPrac3 = () => {
  const observable$ = fromEvent<MouseEvent>(document, 'click');

  observable$
    .pipe(map((e) => e.x + ' ' + e.y))
    .subscribe((x) => console.log(x, '발행'));
};
