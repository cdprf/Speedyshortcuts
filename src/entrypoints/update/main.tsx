/* @refresh reload */
import "~/index.css"
import { render } from "solid-js/web"
import { UpdateApp } from "~/UpdateApp"
import { useAppTheme } from "~/useAppTheme"

const UpdatePage = () => {
  useAppTheme({ useCustomBackground: false })
  return <UpdateApp />
}

render(() => <UpdatePage />, document.getElementById("root")!)
