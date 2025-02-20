/**
 *  自定义表格
 *
 * eg：
 * import publicMixin from '@/components/publicModule/publicMixin.js'
 * mixins: [publicMixin],
 */

import { customListApi } from "./api"
import allList from "./index"


export async function getCals(permissionId: string) {
  return await customListApi.get({ permissionName: permissionId }).then(res => res.data).catch(er => []);
}

export async function setCals(data: any) {
  return await customListApi.post(data).then(res => res.data);
}

// 获取列表
export async function getCalList(permissionId: any) {
  let arr = await getCals(permissionId);
  let arrcals = (allList as any)[permissionId];
  if (arr && arr?.length) {
    let checkedArr = JSON.parse(arr)?.filter((v: any) => v.isChecked)?.map((v: any) => v.prop) || []
    let a = arrcals?.filter((v: any) => checkedArr.includes(v.prop)) || []
    return a
  } else {
    arrcals = (allList as any)[permissionId];
    return arrcals?.filter((v: any) => v.default) || []
  }
}

export function getAllList(permissionId: any) {
  return (allList as any)[permissionId]
}
