import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

function ToggleButton({isEnabled, handleChange, id}) {

  const [enabled, setEnabled] = useState(isEnabled)

  const toggle = (id) => {
    // if(enabled) {
      setEnabled((enabled) => !enabled)
      handleChange(id)
    // }
  }

  useEffect(() => {
    setEnabled(isEnabled)
  }, [isEnabled])

  console.log("ENABLED ", isEnabled)

  return (
    <Switch
      checked={enabled}
      onChange={() => toggle(id)}
      className={`${
        enabled ?  'bg-gray-200' :'bg-blue-600'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`transform transition ease-in-out duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  )
}

export default ToggleButton