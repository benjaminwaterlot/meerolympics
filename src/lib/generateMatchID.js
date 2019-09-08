export default match => {
  const participants = match.participants.map(({ id }) => id).join('_')
  return `${match.sport}_${participants}_${Date.now()}`
}
