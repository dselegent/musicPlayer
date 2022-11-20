export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: {
      emit: (name: string) => void
      on: (name: string, callback: Function) => void
    }
  }
}

declare global {
  const $ref: typeof import('vue')['$ref']
}
