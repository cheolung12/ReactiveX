import { Observable, from, interval } from 'rxjs';

// Observer(구독자)에게 발행물 구독시키기

export const obPrac1 = () => {
  // observable 상수는 $를 붙이는것이 관례
  const observable$ = from([1, 2, 3, 4, 5]);

  // complete로 꼭 마무리해야 메모리에서 제거됨
  const observer = {
    next: console.log,
    error: (err: any) => console.error('발행중 오류', err),
    complete: () => console.log('발행물 완결'),
  };

  observable$.subscribe(observer);
};

export const obPrac2 = () => {
  // complete가 나오게되면 무조건 종료
  const obs$ = new Observable<number>((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
    subscriber.next(4); // 이 값은 발행 x
  });

  const observer = {
    next: (value: number) => console.log(value),
    error: (err: any) => console.error('발행 중 오류', err),
    complete: () => console.log('발행물 완결'),
  };

  obs$.subscribe(observer);
};

export const obPrac3 = () => {
  // unsubscribe: 구독 해제하기
  // unsubscribe를 쓰면 처음부터 새로 구독을 해야함
  const obs$ = interval(1000);
  const subscription = obs$.subscribe(console.log);

  setTimeout(() => {
    subscription.unsubscribe();
    console.log('구독 해제');
  }, 5500);
};

/* 
unsubscribe 대신 complete? 🤔
옵저버블 하나를 여러 구독자가 구독하고 있는 상태라면,
그리고 그 구독자들 중에 특정 구독자만 중지해야하는 상황일때 
complete 대신 unsubscribe를 사용한다.
*/
