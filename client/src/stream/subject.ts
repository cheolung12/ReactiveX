import {
  AsyncSubject,
  BehaviorSubject,
  ReplaySubject,
  Subject,
  interval,
} from 'rxjs';

// observable과 subject 차이
/*
Observable
- 누군가가 구독을 해야 발행 시작
- 각 구독자에게 따로 발행
- unicast
- cold 발행

Subject
- 개발자가 원하는 때에 발행
- 모든 구독자에게 똑같이 발행
- multicast
- hot 발행
*/
export const sbPrac1 = () => {
  const subject = new Subject();

  subject.subscribe(console.log);

  subject.next(1);
  subject.next(3);
  subject.next(5);
};

// 모든 구독자가 같은 값을 보고 있다.
export const sbPrac2 = () => {
  const subject = new Subject();

  setTimeout(() => {
    let x = 0;
    setInterval(() => {
      subject.next(x++);
    }, 2000);
  }, 5000);

  subject.subscribe((x) => console.log('바로구독: ' + x));
  setTimeout(() => {
    subject.subscribe((x) => console.log('3초 후 구독: ' + x));
  }, 3000);
  setTimeout(() => {
    subject.subscribe((x) => console.log('10초 후 구독: ' + x));
  }, 10000);
  setTimeout(() => {
    subject.subscribe((x) => console.log('14초 후 구독: ' + x));
  }, 14000);

  // observable이라면? => 각각 다른 값을 봄
  const obs$ = interval(1000);

  obs$.subscribe((x) => console.log('바로구독: ' + x));
  setTimeout(() => {
    obs$.subscribe((x) => console.log('3초 후 구독: ' + x));
  }, 3000);
  setTimeout(() => {
    obs$.subscribe((x) => console.log('5초 후 구독: ' + x));
  }, 5000);
  setTimeout(() => {
    obs$.subscribe((x) => console.log('10초 후 구독: ' + x));
  }, 10000);
};

// 둘을 결합하여 같은 값을 보게하자
export const sbPrac3 = () => {
  const subject = new Subject();
  const obs$ = interval(1000);

  // subject를 observable의 구독자로 넘겨준다.
  obs$.subscribe(subject);
  // obs$.subscribe(x => {
  //   subject.next(x)
  // })

  subject.subscribe((x) => console.log('바로구독: ' + x));
  setTimeout(() => {
    subject.subscribe((x) => console.log('3초 후 구독: ' + x));
  }, 3000);
  setTimeout(() => {
    subject.subscribe((x) => console.log('5초 후 구독: ' + x));
  }, 5000);
  setTimeout(() => {
    subject.subscribe((x) => console.log('10초 후 구독: ' + x));
  }, 10000);
};

// behaviorSubject => 마지막 값을 저장 후 추가 구독자에게 발행
export const sbPrac4 = () => {
  const subject = new BehaviorSubject(0); // 초기값이 있음

  subject.subscribe((x) => console.log('A: ' + x));

  subject.next(1);
  subject.next(2);
  subject.next(3);

  subject.subscribe((x) => console.log('B: ' + x));

  subject.next(4);
  subject.next(5);
  // A: 0, 1, 2, 3, 4, 5
  // B: 3, 4, 5
  // console.log(`마지막 값: ${subject.getValue()}`);
};

// Replay Subject => 마지막 N개 값을 저장 후 추가 구독자에게 발행
export const sbPrac5 = () => {
  const subject = new ReplaySubject(3); // 마지막 3개 값 저장

  subject.subscribe((x) => console.log('A: ' + x));

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);
  subject.next(5);

  subject.subscribe((x) => console.log('B: ' + x));

  subject.next(6);
  subject.next(7);
  // A: 1,2,3,4,5,6,7
  // B: 3,4,5,6,7
};

// Async Subject => Complete 후의 마지막 값만 발행
export const sbPrac6 = () => {
  const subject = new AsyncSubject();

  subject.subscribe((x) => console.log('A: ' + x));

  subject.next(1);
  subject.next(2);
  subject.next(3);

  subject.subscribe((x) => console.log('B: ' + x));

  subject.next(4);
  subject.next(5);

  subject.subscribe((x) => console.log('C: ' + x));

  subject.next(6);
  subject.next(7);
  subject.complete();

  // A: 7, B: 7, C: 7
};
