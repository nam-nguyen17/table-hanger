export interface HangerData {
  index: number // just update the index
  model: string
  ici: string
  wSize: number
  hSize: number
  bSize: number
  tfSize: number | string
  tfNailType: any
  tfNailQty: number | string
  tfFastenerDisplay: number | string
  hNailType: any
  hNailQty: number | string
  fFastenerDisplay: number | string
  jNailType: any
  jNailQty: number | string
  jFastenerDisplay: number | string
  load: number
  uplift: number
}

export interface EnumData {
  name: string
  enum: number
  displayLabel: string
}

export interface SelectedRow {
  data: HangerData
  index: number
}
