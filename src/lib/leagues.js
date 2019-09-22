const LEAGUES = [
  {
    name: 'MASTER',
    color: 'purple',
    icon: 'chess-queen',
    accent: 0,
    elo: 1700
  },
  {
    name: 'GOLD',
    color: 'yellow',
    icon: 'chess-rook',
    accent: 0,
    elo: 1400
  },
  {
    name: 'SILVER',
    color: 'gray',
    icon: 'chess-knight',
    accent: 0,
    elo: 900
  },
  {
    name: 'BRONZE',
    color: 'orange',
    icon: 'chess-pawn',
    accent: -100,
    elo: 0
  }
]

export default LEAGUES

export const getLeague = elo => LEAGUES.find(league => elo > league.elo)
