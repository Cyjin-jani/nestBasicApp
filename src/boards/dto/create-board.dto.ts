// dto는 interface, class 두 가지로 만들 수 있지만,
// 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용하다.
export class CreateBoardDto {
  title: string;
  content: string;
}
