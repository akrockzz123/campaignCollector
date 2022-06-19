import React from 'react'

import { Menu } from 'semantic-ui-react'

import MenuItem from 'semantic-ui-react'

export const Header = () => {
  return (
     <Menu style = {{ marginTop: '15px'}}>
        <Menu.Item>
            Crowd coin
        </Menu.Item>
        <Menu.Menu position = "right">
         <Menu.Item>
            Campaigns
         </Menu.Item>
         <Menu.Item>
            ksk
         </Menu.Item>
        </Menu.Menu>
     </Menu>
  )
}
