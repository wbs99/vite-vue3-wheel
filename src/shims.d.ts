declare module "*.vue" {
  import { ComponentOptions } from "vue"
  const componentOptions: ComponentOptions
  export default componentOptions
}


type Item = {
  name: string,
  children?: Item[]
}