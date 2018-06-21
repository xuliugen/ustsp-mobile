function toSearchPageByType(type, navigation) {
  switch (type) {
    case 'project':
      navigation.navigate('ProjectSearch')
      break
    default:
      navigation.navigate('My')
      break
  }
}

export {
  toSearchPageByType
}
