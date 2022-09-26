import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

class Product extends Component {
  componentDidMount() {
    const { id } = this.props.params
    console.log(id)
  }

  render() {
    return (
      <div>
        Product Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Repudiandae repellendus excepturi, enim nobis tempora ipsam fugit beatae
        iure corrupti hic doloribus laboriosam quam porro blanditiis vero
        facilis deleniti quae qui?
      </div>
    )
  }
}

export default (props) => <Product {...props} params={useParams()} />
