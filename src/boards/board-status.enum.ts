// 보통 모델을 정의할 때에는 class를 이용하거나 Interface를 이용
// interface: 변수의 타입만을 체크.
// class: 변수의 타입 체크 + 인스턴스 생성 가능

// export interface Board {
//   id: string;
//   title: string;
//   content: string;
//   status: BoardStatus;
// }

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
