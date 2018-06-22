function toSearchPageByType(type, navigation) {
  switch (type) {
    case 'project':
      navigation.navigate('ProjectSearch')
      break
    case 'talent':
      navigation.navigate('TalentSearch')
      break
    default:
      navigation.navigate('My')
      break
  }
}

export {
  toSearchPageByType
}
