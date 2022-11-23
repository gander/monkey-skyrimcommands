export type ExtractedPerk = { name: string, code: string, skill: string }
export type Perk = ExtractedPerk & { selected: boolean, group?: string, level?: string }
