export interface HangerData {
  id: number
  model: string
  ici: string
  wSize: number
  hSize: number
  bSize: number
  tfSize: number | string
  tfNailQty: number | string
  tfNailType: any
  hNailQty: number | string
  hNailType: any
  jNailQty: number | string
  jNailType: any
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
