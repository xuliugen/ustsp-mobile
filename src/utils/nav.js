function toSearchPageByType(type, navigation) {
  switch (type) {
    case 'project':
      navigation.navigate('ProjectSearch')
      break
    case 'talent':
      navigation.navigate('TalentSearch')
      break
    case 'patent':
      navigation.navigate('PatentSearch')
      break
    case 'news':
      navigation.navigate('NewsSearch')
      break
    default:
      navigation.navigate('My')
      break
  }
}

export {
  toSearchPageByType
}
