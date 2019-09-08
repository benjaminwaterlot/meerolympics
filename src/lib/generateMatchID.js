export default match => {
  if (!(match.participants && match.sport))
    throw new Error('MATCH INVALID', match)

  const participants = match.participants.map(({ id }) => id).join('_')

  return `${match.sport}_${participants}_${Date.now()}`
}
