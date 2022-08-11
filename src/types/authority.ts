export interface ListInt {
  name: string;
  roleId: number;
  roleList?: ListInt[];
  viewRole?: string;
}
export class InitData {
  id: number;
  authority: number[];
  list: ListInt[] = [];
  treeRef: any;
  constructor(id: number, authority: number[]) {
    this.id = id;
    this.authority = authority;
  }
}
