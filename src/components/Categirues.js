import React, { Component } from 'react'

export class Categirues extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [
                {
                    key: 'all',
                    name: 'Все'
                },
                {
                    key: 'dota',
                    name: 'Dota'
                },
                {
                    key: 'genshin',
                    name: 'Genshin'
                },
                {
                    key: 'cs',
                    name: 'CS'
                },
            ]
        }
    }
  render() {
    return (
        <div className='categories'>
            <b> Категории </b>
            {this.state.categories.map(el => (
                <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
            ))}
        </div>
    )
  }
}

export default Categirues