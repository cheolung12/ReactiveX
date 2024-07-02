import {
  filter,
  interval,
  map,
  of,
  range,
  scan,
  toArray,
  zip,
  fromEvent,
  from,
} from 'rxjs';

// map: 설명 굳이 필요 x
export const tPrac = () => {
  from([
    { name: 'apple', price: 1200 },
    { name: 'carrot', price: 800 },
    { name: 'meat', price: 5000 },
    { name: 'milk', price: 2400 },
  ])
    .pipe(map((item) => item.price))
    .subscribe(console.log);
};

// toArray
export const tPrac2 = () => {
  range(1, 50)
    .pipe(
      filter((x) => x % 3 === 0),
      filter((x) => x % 2 === 1),
      toArray()
    )
    .subscribe(console.log);
  // [3, 9, 15, 21, 27, 33, 39, 45]
};

// scan
export const tPrac3 = () => {
  const obs$ = of(1, 2, 3, 4, 5);
  // reduce는 결과만 발행(ex: 최종합), scan은 과정까지 다 발행
  obs$
    .pipe(
      scan((acc, x) => {
        return acc + x;
      }, 0)
    )
    .subscribe((x) => console.log('scan: ' + x));
  //  scan: 3
  //  scan: 6
  //  scan: 10
  //  scan: 15
};

// zip : 배열 하나로 합치기
export const tPrac4 = () => {
  const obs1$ = from([1, 2, 3, 4, 5]);
  const obs2$ = from(['a', 'b', 'c', 'd', 'e']);
  const obs3$ = from([true, false, 'F', [6, 7, 8], { name: 'zip' }]);

  zip(obs1$, obs2$, obs3$).subscribe(console.log);
  // [1, 'a', true]
  // [2, 'b', false]
  // [3, 'c', 'F']
  // [4, 'd', Array(3)]
  // [5, 'e', {…}]
};

// 1초마다 값이 쌓이지만 zip되어있기 때문에 클릭하지않는이상 발행 안됨
export const tPrac5 = () => {
  const obs4$ = interval(1000);
  const obs5$ = fromEvent<MouseEvent>(document, 'click').pipe(
    map((event) => event.x)
  );

  zip(obs4$, obs5$).subscribe(console.log);
};
