import React from 'react'
import { render } from 'react-dom'
import Dummy from '../src/components/Dummy'



class ThemeSwitcher extends React.Component {

    switchTheme(theme) {
        const linkNode = document.querySelector('[data-nice-level="theme"]')
        console.log(`Switching to ${theme}`)
        linkNode.href = `/${theme}.css`
    }

    handleThemeSwitchToDefault = () => {
        this.switchTheme('default')
    }

    handleThemeSwitchToCustom = () => {
        this.switchTheme('custom')
    }

    render() {
        return (
            <div>
                <button onClick={this.handleThemeSwitchToDefault}>
                    Default nice theme
                </button>
                <button onClick={this.handleThemeSwitchToCustom}>
                    Customer's crazy theme
                </button>
            </div>
        )
    }

}

class CustomComponent extends React.Component {
    render() {
        const { children } = this.props
        return (
            <div className='CustomComponent'>
                { children }
            </div>
        )
    }
}

render(
      <div>
          <h2>Theme demo</h2>
          <div style={{ padding: '10px' }}>
            <ThemeSwitcher />
          </div>
          <div style={{ padding: '10px' }}>
            <Dummy>
                And I'm so active!
            </Dummy>
          </div>
          <div style={{ padding: '10px' }}>
            <Dummy isActive>
                And I'm so active!
            </Dummy>
          </div>
          <div style={{ padding: '10px' }}>
            <CustomComponent>
                Custom component that supports theming
            </CustomComponent>
          </div>
      </div>,
    document.getElementById('theme-demo')
)
