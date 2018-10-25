function setSelectOneItemAdapter({extValue = null, srcData}) {
  let datas = { data: [] }
  datas.data = srcData.map((item, idx) => ({ ext: extValue, value: item }))
  return datas
}

function setSelectMultiItemAdapter(srcData) {
  let datas = { data: [] }
  datas.data = srcData
  return datas
}

export {
  setSelectOneItemAdapter,
  setSelectMultiItemAdapter
}
