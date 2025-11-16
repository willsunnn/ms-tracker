import { type CharacterWithCachedData, type MapleClass } from 'ms-tracker-library'
import React, { useContext, useState, type ReactNode, useEffect } from 'react'
import Favicon from 'react-favicon'
import ArcaneWeapons from '../resources/arcane-weapons'

interface Title {
  title: string
  image: string
  setTitle: (_: string) => void
  setImage: (_: string) => void
  setTitleCharacter: (_: CharacterWithCachedData[] | undefined) => void
}

const defaultTitle = 'Buff NW'
const defaultImage = ArcaneWeapons.Claw

const TitleContext = React.createContext<Title>({
  title: defaultTitle,
  image: defaultImage,
  setTitle: () => {},
  setImage: () => {},
  setTitleCharacter: () => {}
})

export const useTitle = () => {
  return useContext(TitleContext)
}

const getAbbreviatedName = (characterClass: MapleClass | undefined): string => {
  switch (characterClass) {
    case 'Dark Knight':
      return 'DrK'
    case 'Paladin':
      return 'Pally'
    case 'Bishop':
      return 'Bish'
    case 'Arch Mage (I/L)':
      return 'I/L'
    case 'Arch Mage (F/P)':
      return 'F/P'
    case 'Battle Mage':
      return 'BaM'
    case 'Blaze Wizard':
      return 'BW'
    case 'Night Lord':
      return 'NL'
    case 'Night Walker':
      return 'NW'
    case 'Shadower':
      return 'Shad'
    case 'Blade Master':
      return 'DB'
    case 'Bow Master':
      return 'BM'
    case 'Wind Archer':
      return 'WA'
    case 'Marksman':
      return 'MM'
    case 'Wild Hunter':
      return 'WH'
    case 'Pathfinder':
      return 'PF'
    case 'Buccaneer':
      return 'Bucc'
    case 'Thunder Breaker':
      return 'TB'
    case 'Mechanic':
      return 'Mech'
    case 'Cannon Master':
      return 'CM'
    case 'Dawn Warrior':
      return 'DW'
    case 'Demon Slayer':
      return 'DS'
    case 'Demon Avenger':
      return 'DA'
    case 'Mercedes':
      return 'Merc'
    case 'Luminous':
      return 'Lumi'
    case 'Angelic Buster':
      return 'AB'
    case 'Beast Tamer':
      return 'BT'
    case 'Hoyoung':
      return 'HY'
    case 'Mo Xuan':
      return 'MX'
    case 'Sia Astelle':
      return 'Sia'
    // These are all not abbreviated
    case 'Hero':
    case 'Evan':
    case 'Shade':
    case 'Ark':
    case 'Corsair':
    case 'Jett':
    case 'Kaiser':
    case 'Mihile':
    case 'Xenon':
    case 'Blaster':
    case 'Aran':
    case 'Phantom':
    case 'Kanna':
    case 'Hayato':
    case 'Cadena':
    case 'Illium':
    case 'Adele':
    case 'Kain':
    case 'Khali':
    case 'Lara':
    case 'Zero':
    case 'Kinesis':
    case 'Lynn':
    case 'Ren':
      return characterClass
    case 'Unknown':
    case undefined:
      return 'NW'
  }
}

const getArcaneWeapon = (characterClass: MapleClass | undefined): string => {
  switch (characterClass) {
    case 'Hero':
      return ArcaneWeapons.TwoHandedAxe
    case 'Dark Knight':
      return ArcaneWeapons.Spear
    case 'Paladin':
      return ArcaneWeapons.TwoHandedHammer
    case 'Bishop':
    case 'Arch Mage (I/L)':
    case 'Arch Mage (F/P)':
    case 'Battle Mage':
    case 'Blaze Wizard':
    case 'Evan':
      return ArcaneWeapons.Staff
    case 'Night Lord':
    case 'Night Walker':
      return ArcaneWeapons.Claw
    case 'Shadower':
      return ArcaneWeapons.Dagger
    case 'Blade Master':
      return ArcaneWeapons.Katara
    case 'Bow Master':
    case 'Wind Archer':
      return ArcaneWeapons.Bow
    case 'Marksman':
    case 'Wild Hunter':
      return ArcaneWeapons.Crossbow
    case 'Pathfinder':
      return ArcaneWeapons.AncientBow
    case 'Buccaneer':
    case 'Thunder Breaker':
    case 'Shade':
    case 'Ark':
      return ArcaneWeapons.Knuckle
    case 'Corsair':
    case 'Mechanic':
    case 'Jett':
      return ArcaneWeapons.Gun
    case 'Cannon Master':
      return ArcaneWeapons.HandCannon
    case 'Dawn Warrior':
    case 'Kaiser':
      return ArcaneWeapons.TwoHandedSword
    case 'Mihile':
      return ArcaneWeapons.OneHandedSword
    case 'Demon Slayer':
      return ArcaneWeapons.OneHandedAxe
    case 'Demon Avenger':
      return ArcaneWeapons.Desperado
    case 'Xenon':
      return ArcaneWeapons.WhipBlade
    case 'Blaster':
      return ArcaneWeapons.ArmCannon
    case 'Aran':
      return ArcaneWeapons.Polearm
    case 'Mercedes':
      return ArcaneWeapons.DualBowguns
    case 'Phantom':
      return ArcaneWeapons.Cane
    case 'Luminous':
      return ArcaneWeapons.ShiningRod
    case 'Kanna':
      return ArcaneWeapons.Fan
    case 'Hayato':
      return ArcaneWeapons.Katana
    case 'Angelic Buster':
      return ArcaneWeapons.SoulShooter
    case 'Cadena':
      return ArcaneWeapons.Chain
    case 'Kain':
      return ArcaneWeapons.Whispershot
    case 'Illium':
      return ArcaneWeapons.LucentGauntlet
    case 'Adele':
      return ArcaneWeapons.Bladecaster
    case 'Khali':
      return ArcaneWeapons.Chakram
    case 'Beast Tamer':
      return ArcaneWeapons.Scepter
    case 'Hoyoung':
      return ArcaneWeapons.RitualFan
    case 'Lara':
      return ArcaneWeapons.Wand
    case 'Zero':
      return ArcaneWeapons.HeavySword
    case 'Kinesis':
      return ArcaneWeapons.PsyLimiter
    case 'Lynn':
      return ArcaneWeapons.MemorialStaff
    case 'Mo Xuan':
      return ArcaneWeapons.WarFist
    case 'Sia Astelle':
      return ArcaneWeapons.CelestialLight
    case 'Ren':
      return ArcaneWeapons.IllusorySword
    case 'Unknown':
    case undefined:
      return ArcaneWeapons.Claw
  }
}

export const TitleContextProvider = (props: { children: ReactNode }) => {
  // Set initial values
  const [title, setTitle] = useState<string>(defaultTitle)
  const [image, setImage] = useState<string>(defaultImage)

  useEffect(() => {
    document.title = title
  }, [title])

  const setTitleCharacter = (characters: CharacterWithCachedData[] | undefined) => {
    if (characters && characters.length > 0) {
      const character = characters[0]
      setTitle(`Buff ${getAbbreviatedName(character.cachedData?.class)}`)
      setImage(getArcaneWeapon(character.cachedData?.class))
    } else {
      setTitle(defaultTitle)
      setImage(defaultImage)
    }
  }

  const value: Title = {
    title,
    image,
    setTitle,
    setImage,
    setTitleCharacter
  }

  return (
    <TitleContext.Provider value={value}>
      <Favicon url={image}/>
      {props.children}
    </TitleContext.Provider>
  )
}
