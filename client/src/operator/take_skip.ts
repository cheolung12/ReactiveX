import {
  filter,
  fromEvent,
  interval,
  map,
  range,
  skipUntil,
  take,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

// take 상위 값 n개 출력
export const takePrac1 = () => {
  const observer = {
    next: (value: number) => console.log(value),
    error: (err: any) => console.error(err),
    complete: () => console.log('COMPLETE'),
  };
  // interval이나 click 이벤트와 같이 쓰면 제한 걸수 있음
  interval(1000).pipe(take(5)).subscribe(observer);
};

export const takePrac2 = () => {
  // 클릭 수 뿐 아니라 filter로 범위까지 제한해버리기
  const observer = {
    next: (value: number) => console.log(value),
    error: (err: any) => console.error(err),
    complete: () => console.log('COMPLETE'),
  };

  fromEvent<MouseEvent>(document, 'click')
    .pipe(
      map((event) => event.x),
      filter((x) => x < 200),
      take(5)
    )
    .subscribe(observer);
};

// takeLast => 뒤에서부터 N개 선택 (생략)
// 스트림이 끝나야만 실행됨 (interval만 쓰면 실행 안됨 끝이 없으니까ㅏ)

// takeWhile => ~하는 동안 선택
export const takePrac3 = () => {
  range(1, 20)
    .pipe(takeWhile((x) => x <= 10))
    .subscribe(console.log);
  // 1~10 출력
};

// 범위 안에서는 이벤트 발행, 밖을 벗어나면 complete
export const takePrac4 = () => {
  const observer = {
    next: (value: number) => console.log(value),
    error: (err: any) => console.error(err),
    complete: () => console.log('COMPLETE'),
  };

  fromEvent<MouseEvent>(document, 'click')
    .pipe(
      map((event) => event.x),
      takeWhile((x) => x < 200)
    )
    .subscribe(observer);
};

// ⭐️ takeUntil => 기준이 되는 스트림이 발행하기까지
// 요청이 오는동안 특정 애니메이션을 실행하고 싶을때 사용!
export const takePrac5 = () => {
  interval(50)
    .pipe(
      takeUntil(
        ajax('http://127.0.0.1:3000/people/name/random').pipe(
          map((res) => res.response),
          tap(console.log)
        )
      )
    )
    .subscribe(console.log);
};

// skip => 말 그대로 건너뜀, take의 반대임
// skipLast => 맨 뒤에 N개 빼기
// skipWhile => ~하는 동안 건너 뛰기
// skipUntil => 기준이 되는 스트림(인자)이 발행하고부터
export const skipPrac = () => {
  // 5초간은 아무 변화없다가 클릭 가능
  const obs1$ = fromEvent<MouseEvent>(document, 'click');
  const obs2$ = timer(5000);

  const observer = {
    next: (value: number) => console.log(value),
    error: (err: any) => console.error(err),
    complete: () => console.log('COMPLETE'),
  };
  obs1$
    .pipe(
      map((event) => event.x),
      skipUntil(obs2$)
    )
    .subscribe(observer);
};
